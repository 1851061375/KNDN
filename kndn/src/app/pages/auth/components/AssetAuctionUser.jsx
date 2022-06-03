import clsx from 'clsx'
import React, { FC, useState } from 'react'
import moment from 'moment';
import { Link, useHistory } from "react-router-dom";
import { CONFIG } from '../../../../helpers/config'
import { checkIsActive } from '../../../../_metronic/helpers';
import { NavbarUser } from './NavbarUser';

const AssetAuctionUser = () => {
    
    const history = useHistory();

    return (
        <>
            <div className='container profile-container'>
                <div className='card shadow-sm border border-gray-200'>
                <div className="row mx-0">
                    <div className="col-12 col-md-3 profile-left border-end border-gray-200 py-6">
                    <NavbarUser />
                    </div>
                    <div className="col-12 col-md-9 profile-right py-6">
                        
                    </div>
                </div>
                </div>
            </div>
    </>
    )
}

export { AssetAuctionUser }