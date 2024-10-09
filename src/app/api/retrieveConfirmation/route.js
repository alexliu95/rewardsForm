import { NextResponse } from 'next/server';
import https from 'https';
import util from 'util';
import xmlrpc from 'xmlrpc';

export async function POST(request) {
  // 从请求体获取数据
    const { tourInfo, passengerNumber, passengers, emergency, billing } = await request.json();

    console.log('tourInfo is: ', tourInfo);
    console.log('passengerNumber is: ', passengerNumber);
    console.log('passengers is: ', passengers);
    console.log('emergency is: ', emergency);
    console.log('billing is: ', billing);

    const confirmationNo = `L${tourInfo.productDate.replace(/-/g, '')}${tourInfo.productId}${passengerNumber}`;

    const transformedPassengers = passengers.slice(0, passengerNumber).map((p, index) => ({
        [`p${index + 1}_first_name`]: p.firstname || '',
        [`p${index + 1}_last_name`]: p.lastname || '',
        [`p${index + 1}_middle_name`]: p.middlename || '',
        [`p${index + 1}_gender`]: p.gender || '',
        [`p${index + 1}_passport_expiry`]: p.passportexpiry || '',
        [`p${index + 1}_passport_number`]: p.passportnumber || '',
        [`p${index + 1}_passport_nation`]: p.nationality || '',
        [`p${index + 1}_date_of_birth`]: p.dob || '',
        [`p${index + 1}_phone`]: p.phonenumber || '',
        [`p${index + 1}_email`]: p.email || '',
    }));

    for (let i = passengerNumber; i < 6; i++) {
        transformedPassengers.push({
            [`p${i + 1}_first_name`]: '',
            [`p${i + 1}_last_name`]: '',
            [`p${i + 1}_middle_name`]: '',
            [`p${i + 1}_gender`]: '',
            [`p${i + 1}_passport_expiry`]: '',
            [`p${i + 1}_passport_number`]: '',
            [`p${i + 1}_passport_nation`]: '',
            [`p${i + 1}_date_of_birth`]: '',
            [`p${i + 1}_phone`]: '',
            [`p${i + 1}_email`]: '',
        });
    }

    // Mapping emergency contact data
    const emergencyContact = {
        tour_emergency_name: emergency.firstname || '',
        tour_emergency_phone: emergency.phonenumber || '',
        tour_emergency_email: emergency.email || '',
    };

    // Mapping billing data
    const billingData = {
        mailing_address: billing.address || '',
        mailing_address_city: billing.city || '',
        mailing_address_state: billing.state || '',
        mailing_address_country: billing.country || '',
        mailing_address_postal: billing.zipcode || '',
    };

    const record = {
        ...transformedPassengers.reduce((acc, cur) => ({ ...acc, ...cur }), {}),
        ...emergencyContact,
        ...billingData,
        traveller_no: passengerNumber,
        room_type: emergency.roomtype == "KingBedRoom" ? '1' : "2",
        tour_other_comment: emergency.undefined || '',
        confirm_no: confirmationNo,
        name: tourInfo.productName + '@' + (tourInfo.productCity ? tourInfo.productCity : "") + '@' + (tourInfo.productDate ? tourInfo.productDate : "")
    };

    console.log('tourname: ', tourInfo.productName + '@' + (tourInfo.productCity ? tourInfo.productCity : "") + '@' + (tourInfo.productDate ? tourInfo.productDate : ""))

    const url = 'https://erp.rewardsholiday.com/jsonrpc';
    const db = 'demo';
    const username = 'admin@rewardsholiday.com';
    const password = '1qazxsw2';

    let id = null;
    let counter = 1;

    const authenticate = async () => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    service: 'common',
                    method: 'authenticate',
                    args: [db, username, password, {}],
                },
                id: 1,
            }),
        });
    
        const data = await response.json();
        if (data.error) {
            throw new Error('Authentication failed');
        }
        return data.result;
    };

    const createRecord = async (uid, record) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    service: 'object',
                    method: 'execute_kw',
                    args: [db, uid, password, 'tour.booking_info', 'create', [record]],
                },
                id: 2,
            }),
        });
    
        const data = await response.json();
        if (data.error) {
            throw new Error('Record creation failed');
        }
        return data.result;
    };

    try {
        const uid = await authenticate();
        do {
            try {
                id = await createRecord(uid, record);
                console.log('Attempt success')
            } catch (error) {
                console.error(`Attempt ${counter} failed:`, error);
            }
            counter += 1;
        } while (!id && counter < 4);
    
        if (id) {
            return NextResponse.json({ success: true, id, confirmNo: confirmationNo });
        } else {
            return NextResponse.json({ success: false, error: 'Failed to create record' });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }

}