/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, { FC, useState } from 'react'
import moment from 'moment';
import { Link, useHistory } from "react-router-dom";
import { CONFIG } from '../../../../helpers/config'
import { checkIsActive } from '../../../../_metronic/helpers';
import { NavbarUser } from './NavbarUser';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux'

const ProfileUser = () => {

    const accessToken = useSelector((state) => state.auth.accessToken)
    const user = useSelector((state) => state.auth.user)

    const { TabPane } = Tabs

    return (
        <>
            <div className='container profile-container'>
                <div className='card shadow-sm border border-gray-200'>
                    <div className="row mx-0">
                        <div className="col-12 col-md-3 profile-left border-end border-gray-200 py-6">
                            <NavbarUser />
                        </div>
                        <div className="col-12 col-md-9 profile-right py-6">
                            <Tabs type="card">
                                <TabPane tab="Thông tin cá nhân" key="1">
                                    <div>
                                        <div className="row py-2">
                                            <div className="row col-md-6 col-xs-12">
                                                <p className="col-sm-6 text-gray-800 fw-bold mb-0 text-sm-end">Họ và tên:</p>
                                                <p className="col-sm-6 mb-3 mb-sm-0">{user?.fullName ?? ''}</p>
                                            </div>
                                            <div className="row col-md-6 col-xs-12">
                                                <p className="col-sm-6 text-gray-800 fw-bold mb-0 text-sm-end">Tên đăng nhập:</p>
                                                <p className="col-sm-6 mb-3 mb-sm-0">{user?.fullName ?? ''}</p>
                                            </div>
                                        </div>
                                        <div className="row py-2 border-top">
                                            <div className="row col-md-6 col-xs-12">
                                                <p className="col-sm-6 text-gray-800 fw-bold mb-0 text-sm-end">Loại tài khoản:</p>
                                                <p className="col-sm-6 mb-3 mb-sm-0">Cá nhân</p>
                                            </div>
                                            <div className="row col-md-6 col-xs-12">
                                                <p className="col-sm-6 text-gray-800 fw-bold mb-0 text-sm-end">Email:</p>
                                                <p className="col-sm-6 mb-3 mb-sm-0">{user?.email ?? ''}</p>
                                            </div>
                                        </div>
                                        <div className="row py-2 border-top">
                                            <div className="row col-md-6 col-xs-12">
                                                <p className="col-sm-6 text-gray-800 fw-bold mb-0 text-sm-end">Số điện thoại:</p>
                                                <p className="col-sm-6 mb-3 mb-sm-0">{user?.phoneNumber ?? ''}</p>
                                            </div>
                                            <div className="row col-md-6 col-xs-12">
                                                <p className="col-sm-6 text-gray-800 fw-bold mb-0 text-sm-end">Địa chỉ:</p>
                                                <p className="col-sm-6 mb-3 mb-sm-0">
                                                    {user?.address ?? ''}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row py-2 border-top">
                                            <div className="row col-md-6 col-xs-12">
                                                <p className="col-sm-6 text-gray-800 fw-bold mb-0 text-sm-end">Ngày sinh:</p>
                                                <p className="col-sm-6 mb-3 mb-sm-0">
                                                    {user?.birthday ?? ''}
                                                </p>
                                            </div>
                                            <div className="row col-md-6 col-xs-12">
                                                <p className="col-sm-6 text-gray-800 fw-bold mb-0 text-sm-end">Giới tính:</p>
                                                <p className="col-sm-6 mb-3 mb-sm-0">{user?.sex ?? ''}</p>
                                            </div>
                                        </div>
                                        <div className="row py-2 border-top">
                                            <div className="row col-md-6 col-xs-12">
                                                <p className="col-sm-6 text-gray-800 fw-bold mb-0 text-sm-end">Số chứng minh thư/Thẻ căn cước/Hộ chiếu:</p>
                                                <p className="col-sm-6 mb-3 mb-sm-0">
                                                    {user?.indentifier ?? ''}
                                                </p>
                                            </div>
                                            <div className="row col-md-6 col-xs-12">
                                                <p className="col-sm-6 text-gray-800 fw-bold mb-0 text-sm-end">Ngày cấp:</p>
                                                <p className="col-sm-6 mb-3 mb-sm-0">

                                                </p>
                                            </div>
                                        </div>
                                        <div className="row py-2 border-top">
                                            <div className="row col-md-6 col-xs-12">
                                                <p className="col-sm-6 text-gray-800 fw-bold mb-0 text-sm-end">Nơi cấp:</p>
                                                <p className="col-sm-6 mb-3 mb-sm-0">

                                                </p>
                                            </div>
                                            <div className="row col-md-6 col-xs-12">
                                                <p className="col-sm-6 text-gray-800 fw-bold mb-0 text-sm-end">Mã bưu chính:</p>
                                                <p className="col-sm-6 mb-3 mb-sm-0">

                                                </p>
                                            </div>
                                        </div>
                                        <div className="row py-2 border-top">
                                            <div className="row col-md-6 col-xs-12">
                                                <p className="col-sm-6 text-gray-800 fw-bold mb-0 text-sm-end">Ảnh CMT mặt trước/ Thẻ căn cước/ Hộ chiếu:</p>
                                                <div className="col-sm-6 col-xs-6"><img id="PreviewImageAccount1" className="Previewimg" src="/files/upload/counterparty/idcard_front-1648609456860.png" alt="" /></div>
                                            </div>
                                            <div className="row col-md-6 col-xs-12">
                                                <p className="col-sm-6 text-gray-800 fw-bold mb-0 text-sm-end">Ảnh CMT mặt sau/ Thẻ căn cước/ Hộ chiếu:</p>
                                                <div className="col-sm-6 col-xs-6"><img id="PreviewImageAccount2" className="Previewimg" src="/files/upload/counterparty/idcard_back-1648609461255.png" alt="" /></div>
                                            </div>
                                        </div>
                                        <div className="col-12 border-top">
                                            <div className="row py-2">
                                                <p className="col-sm-6 col-md-auto text-gray-800 fw-bold text-sm-right mb-0">Trạng thái xác thực email:</p>
                                                <p className="col-sm-6 col-md mb-0"><span className="bg-danger text-white rounded-pill d-inline-block px-2 mb-0"><i className="fas fa-times-circle text-white"></i> Chưa xác thực</span></p>
                                            </div>
                                            <a className="btn btn-primary btn-sm fw-normal mt-md-4 py-2"><i className="fas fa-edit mr-1"></i>Chỉnh sửa</a>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tab="Thông tin nộp phí tài khoản" key="2">
                                    Content of Tab Pane 2
                                </TabPane>
                                <TabPane tab="Tài khoản ngân hàng" key="3">
                                    Content of Tab Pane 3
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export { ProfileUser }
