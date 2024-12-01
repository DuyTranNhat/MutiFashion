import React, { useEffect, useState } from "react";
import YearChart from "./YearChart";
import { GetListOrderMonthly, GetListOrderYear } from "../../Services/OrderService";
import { Order, YearReport } from "../../Models/Chart";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PageObject } from "../../Models/Common";
import { PAGE_LIMIT_ORDERS } from "../../Utils/constant";
import { toast } from "react-toastify";
import Table from "../../Components/Table/Table";
import Paging from "../../Components/Paging/Paging";

// Schema dùng Yup để xác thực
const validateSchema = yup.object().shape({
  year: yup
    .number()
    .typeError("Năm phải là số")
    .required("Năm không được để trống")
    .min(2000, "Năm phải từ 2000 trở đi")
    .max(new Date().getFullYear(), "Năm không được lớn hơn năm hiện tại"),
});

type FilterForm = {
  year: number;
};

const ReportYear: React.FC = () => {
  const [data, setData] = useState<YearReport[]>();
  const [table, setTable] = useState<Order[]>();
  const [page, setPage] = useState<PageObject>();
  const [year, setYear] = useState<number>();


  const getTable = (year: number, page: number = 1, limit: number = PAGE_LIMIT_ORDERS) => {
    GetListOrderYear(year, page, limit)
      .then((res) => {
        if (res?.data) {
          setPage(res.data.page);
          setTable(res.data.items);
        }
      })
      .catch((err) => { toast.error(err) })
  }


  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FilterForm>({
    resolver: yupResolver(validateSchema),
    defaultValues: {
      year: new Date().getFullYear(), // Mặc định là năm hiện tại
    },
  });

  // Hàm xử lý khi lọc dữ liệu
  const handleClickFilter = (formData: FilterForm) => {
    const { year } = formData;
    setYear(year)
    GetListOrderMonthly(year).then((res) => {
      if (res?.data) {
        console.log(`Dữ liệu năm ${year}:`, res.data);
        setData(res.data);
        getTable(year)
      } else {
        setData([]);
      }
    });
  };

  // Lấy dữ liệu mặc định cho năm hiện tại
  useEffect(() => {
    GetListOrderMonthly(new Date().getFullYear()).then((res) => {
      if (res?.data) {
        setData(res.data);
        getTable(new Date().getFullYear())
      }
    });
  }, []);




  const configs = [
    {
      label: "#",
      render: (dto: Order) => dto.orderId,
    },
    {
      label: "Order Date",
      render: (dto: Order) => dto.orderDate,
    },
    {
      label: "Payment Method",
      render: (dto: Order) => dto.paymentMethod,
    },
    {
      label: "Phone",
      render: (dto: Order) => dto.phone,
    },
    {
      label: "Total Quantity",
      render: (dto: Order) => dto.totalAmount,
    },
  ];


  const handlePageChange = (pageNumber: number) => {
    if (year)
      getTable(year, pageNumber, PAGE_LIMIT_ORDERS)
    else getTable(new Date().getFullYear(), pageNumber, PAGE_LIMIT_ORDERS)
  };
  return (
    <div className="container">
      {/* Form lọc */}
      <form onSubmit={handleSubmit(handleClickFilter)}>
        <div className="container bg-light col-12 mt-3">
          <div className="bg-light rounded h-100 p-4">
            <h6 className="mb-4">
              <h5>
                <b>Filter</b>
              </h5>
            </h6>
            <div className="row mb-3">
              <label htmlFor="yearInput" className="col-sm-2 col-form-label">
                Năm:
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="yearInput"
                  placeholder="Nhập năm"
                  {...register("year")}
                />
                {errors.year && (
                  <p className="text-danger mt-2">{errors.year.message}</p>
                )}
              </div>
            </div>
            <button className="btn btn-primary w-60 m-3" type="submit">
              Filter
            </button>
          </div>
        </div>
      </form>

      {/* Biểu đồ */}
      <div className="m-5 bg-light rounded shadow">
        <div className="d-flex align-content-center justify-content-center" >
          <h1 className="m-5">
            Biểu đồ tổng tiền theo từng tháng của năm{" "}
          </h1>
        </div>
        <div className="ps-4" >
          {data && data.length > 0 ? (
            <YearChart data={data} />
          ) : (
            <h1 className="text-center">Không có dữ liệu!</h1>
          )}
        </div>


      </div>
      <div className="bg-light rounded shadow">
        <h1 className="p-4" >Danh Sách Hóa Đơn trong năm </h1>
        <div className="p-4 bg-white">
          {table && table.length > 0 && (<Table configs={configs} data={table} />)}
          <div>
            {page && (
              <Paging
                currentPage={page?.currentPage!}
                onPageChange={handlePageChange}
                pageSize={page?.pageSize!}
                totalItems={page?.totalItems!}
                totalPages={page?.totalPages!}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportYear;
