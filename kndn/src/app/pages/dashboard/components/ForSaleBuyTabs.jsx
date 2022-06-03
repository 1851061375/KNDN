import { Tabs, Modal, Button, Image } from "antd";
import React, { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { CONFIG } from "../../../../helpers/config";
import { requestPOST, requestGET } from "../../../../helpers/baseAPI";
import { useHistory } from "react-router-dom";
import "./ForSaleBuyTabs.scss";
import moment from "moment";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ForSaleBuyTabs = () => {
  const history = useHistory();
  const { TabPane } = Tabs;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // var res = await requestGET(`${CONFIG.GETWAY_PATH}/listarticles?skip=0&top=5&search=&categoryid=15&orderby=`);
      // var _data = res?.data ?? []
      var _data = [
        {
          ID: 1,
          text: "Thành Long tìm kiếm đối tác kết nối sản phẩm CNHT – Lò xo",
          time: "2022-02-02T15:50:00Z",
          images: ["cate1.jpg", "cate2.jpg", "cate3.jpg"],
          description:
            "CÔNG TY TNHH LÒ XO THÀNH PHÁT chuyên sản xuất các loại lò xo dùng trong sản xuất công nghiệp, dịch vụ, mặt hàng trang trí ... Lò xo được sản xuất trên dây chuyền công nghệ máy móc CNC hiện đại hoàn toàn tự động , đáp ứng được mọi yêu cầu của khách hàng",
        },
        {
          ID: 2,
          text: "Rạng Đông tìm kiếm đối tác kết nối sản phẩm CNHT – Phích nước thủy tinh",
          time: "2022-01-02T15:50:00Z",
          images: ["cate3.jpg", "cate4.jpg", "cate5.jpg"],
          description:
            "Công ty cổ phần Bóng đèn Phích nước Rạng Đông (tiền thân là nhà máy Bóng đèn Phích nước Rạng Đông) được khởi công xây dựng từ năm 1958, là một trong 13 nhà máy đầu tiên được thành lập theo quyết định của Chính phủ, đặt nền móng cho nền công nghiệp Việt Nam thời kỳ đầu xây dựng chủ nghĩa xã hội.",
        },
        {
          ID: 3,
          text: "Nhựa An Phú Việt tìm kiếm đối tác kết nối sản phẩm CNHT – Linh kiện điện thoại vỏ ốp",
          time: "2021-12-20",
          images: ["cate5.jpg", "cate6.jpg", "cate3.jpg"],
          description:
            "Công ty TNHH nhựa An Phú Việt chuyên sản xuất các sản phẩm từ plastic như linh kiện điện tử, điện thoại, xe máy; lắp ráp các phụ tùng thiết bị điện tử cung cấp cho các Công ty lớn như Samsung Việt Nam, Panasonic, Brother, Honda,...",
        },
      ];
      setData(_data);
    };
    fetchData();
    return () => {};
  }, []);

  return (
    <>
      <Tabs defaultActiveKey="1" type="card" className="pb-4">
        <TabPane tab="Thông tin chào bán" key="1">
          <div className="table-responsive">
            <table className="table table-striped h-home-table">
              <tbody>
                {data.map((i, iIndex) => (
                  <tr key={"tr" + iIndex}>
                    <td width="75px">
                      <div
                        className="h-tbl-time"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Thời điểm đăng tải"
                      >
                        <div className="h-tbl-time-1">
                          {moment(i.time).month() + 1}-{moment(i.time).year()}
                        </div>
                        <div className="h-tbl-time-2">
                          {moment(i.time).date()}
                        </div>
                        <div className="h-tbl-time-3">
                          {moment(i.time).format("HH:mm")}
                        </div>
                      </div>
                    </td>
                    <td className="h-tbl-border">
                      <p className="mb-2" title={i.text}>
                        <Link to="#">{i.text}</Link>
                      </p>
                      <p className="m-0 h-tbl-comment" title={i.description}>
                        {i.description}
                      </p>
                    </td>
                    <td width="200px" className="ps-xl-5">
                      {i.images && i.images.length ? (
                        <>
                          <Image
                            preview={toAbsoluteUrl(
                              "/media/products/" + i.images[0]
                            )}
                            width={180}
                            src={toAbsoluteUrl(
                              "/media/products/" + i.images[0]
                            )}
                          ></Image>
                        </>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-center mb-0">
            <Link
              to="/forsale"
              className="text-primary btn py-1 bg-primary bg-opacity-20 bg-hover-primary text-hover-white fw-normal"
            >
              Xem thêm
            </Link>
          </p>
        </TabPane>
        <TabPane tab="Thông tin chào mua" key="2">
          <div className="table-responsive">
            <table className="table table-striped h-home-table">
              <tbody>
                {data.map((i, iIndex) => (
                  <tr key={"tr" + iIndex}>
                    <td width="75px">
                      <div
                        className="h-tbl-time"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Thời điểm đăng tải"
                      >
                        <div className="h-tbl-time-1">
                          {moment(i.DatePublish).month() + 1}-
                          {moment(i.DatePublish).year()}
                        </div>
                        <div className="h-tbl-time-2">
                          {moment(i.DatePublish).date()}
                        </div>
                        <div className="h-tbl-time-3">
                          {moment(i.DatePublish).format("HH:mm")}
                        </div>
                      </div>
                    </td>
                    <td className="h-tbl-border">
                      <p className="mb-2" title={i.text}>
                        <Link to="#">{i.text}</Link>
                      </p>
                      <p className="m-0 h-tbl-comment" title={i.description}>
                        {i.description}
                      </p>
                    </td>
                    <td width="200px" className="ps-xl-5">
                      {i.images && i.images.length ? (
                        <>
                          <Image
                            preview={toAbsoluteUrl(
                              "/media/products/" + i.images[0]
                            )}
                            width={180}
                            src={toAbsoluteUrl(
                              "/media/products/" + i.images[0]
                            )}
                          ></Image>
                        </>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-center mb-0">
            <Link
              to="/forbuy"
              className="text-primary btn py-1 bg-primary bg-opacity-20 bg-hover-primary text-hover-white fw-normal"
            >
              Xem thêm
            </Link>
          </p>
        </TabPane>
      </Tabs>
    </>
  );
};
export { ForSaleBuyTabs };
