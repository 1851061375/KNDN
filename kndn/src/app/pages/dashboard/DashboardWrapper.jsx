/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { requestPOST } from "../../../helpers/baseAPI";
import { CONFIG } from "../../../helpers/config";
import { PartnerCarousel } from "./components/PartnerCarousel";
import { NewsCarousel } from "./components/NewsCarousel";
import { ForSaleBuyTabs } from "./components/ForSaleBuyTabs";

import "./dashboard.scss";
import { DatePicker, Space, Tooltip } from "antd";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import { LinkImageWrapper } from "../../../_metronic/layout/components/linkimage/LinkImageWrapper";
import { ChartsWidgetHome } from "../../../_metronic/partials/widgets/charts/ChartsWidgetHome";
import { ProductByCategory } from "./components/ProductByCategory";
import { NotificationAndEvent } from "./components/NotificationAndEvent";
const DashboardPage = () => {
  document.title = "Cổng thông tin kết nối doanh nghiệp ngành công nghiệp";

  // const { RangePicker } = DatePicker
  // const accessToken = useSelector((state) => state.auth.accessToken)
  // const user = useSelector((state) => state.auth.user)

  return (
    <>
      <ProductByCategory />
      {/* Danh sách sản phẩm */}
      <div className="section-document-home bg-white py-6">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8 col-xl-9 section-document-left">
              <ForSaleBuyTabs /> {/* Chào mua, chào bán */}
            </div>
            <div className="col-12 col-lg-4 col-xl-3 section-document-right">
              <LinkImageWrapper /> {/* Link liên kết */}
              <ChartsWidgetHome className="mt-6" /> {/* Biểu đồ nhanh */}
            </div>
          </div>
        </div>
      </div>
      <div className="section-document-home">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8 col-xl-9 section-document-left">
              <NewsCarousel /> {/* Tin tức */}
            </div>
            <div className="col-12 col-lg-4 col-xl-3 section-document-right">
              <NotificationAndEvent /> {/* Thông báo và sự kiện */}
            </div>
          </div>
        </div>
      </div>
      <PartnerCarousel /> {/* Đối tác */}
    </>
  );
};

const DashboardWrapper = () => {
  const intl = useIntl();
  return (
    <>
      <DashboardPage />
    </>
  );
};

export { DashboardWrapper };
