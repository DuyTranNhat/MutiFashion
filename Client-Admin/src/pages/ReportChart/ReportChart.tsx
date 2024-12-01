import React, { useEffect, useState } from "react";
import BarChartTop from "./BarChartTop";
import PieChartTop from "./PieChartTop";
import {
  GetListTopVariant,
  GetListVariantInRange,
} from "../../Services/OrderService";
import {
  GetListVariantChart,
  RangeDate,
  RangeDateNoTop,
  TopVariant,
} from "../../Models/Chart";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import Table from "../../Components/Table/Table";
import { PageObject } from "../../Models/Common";
import Paging from "../../Components/Paging/Paging";
import { PAGE_LIMIT_CHART_VARIANT } from "../../Utils/constant";

const validateSchema = yup.object({
  startDate: yup
    .string()
    .required("Start date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid start date format"),
  endDate: yup
    .string()
    .required("End date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid end date format"),
  top: yup
    .number()
    .min(1, "Top must be greater than 0")
    .required("Top is required"),
});

const ReportChart = () => {
  const [data, setData] = useState<TopVariant[]>();
  const [filter, setFilter] = useState<RangeDate>();
  const [table, setTable] = useState<GetListVariantChart[]>();
  const [pageObject, setPageObject] = useState<PageObject>();
  useEffect(() => {
    GetDataChart(
      getValues("top"),
      getValues("startDate"),
      getValues("endDate")
    );
    getTableInRange(getValues("startDate"), getValues("endDate"));
  }, []);

  
  useEffect(() => {
    if (filter) {
      GetDataChart(filter?.top, filter?.startDate, filter?.endDate);
      getTableInRange(filter?.startDate, filter?.endDate);
    }
  }, [filter]);

  const getTableInRange = (start: string, end: string) => {
    const tmp = returnRangDateNoTop(start, end);
    GetListVariantInRange(tmp, 1, PAGE_LIMIT_CHART_VARIANT)
      .then((res) => {
        console.log("res:", res);
        if (res?.data) {
          setTable(res?.data.items);
          setPageObject(res?.data.page);
        }
      })
      .catch(() => {
        console.log("catch");
      });
  };

  const returnRangDate = (top: number, start: string, end: string) => {
    return new RangeDate(top, start, end);
  };

  const returnRangDateNoTop = (start: string, end: string) => {
    return new RangeDateNoTop(start, end);
  };

  const GetDataChart = (top: number, start: string, end: string) => {
    const tmp = returnRangDate(top, start, end);
    GetListTopVariant(tmp)
      .then((res) => {
        console.log("res:", res);
        setData(res?.data);
      })
      .catch(() => {
        console.log("catch");
      });
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<RangeDate>({
    resolver: yupResolver(validateSchema),
    defaultValues: filter || {
      endDate: new Date().toISOString().split("T")[0],
      startDate: "2024-01-01",
      top: 5,
    },
  });

  const handleChangFilter = (top: number, start: string, end: string) => {
    const result = returnRangDate(top, start, end);
    setFilter(result);
  };
  const clickSubmit = () => {
    console.log("1");

    handleChangFilter(
      getValues("top"),
      getValues("startDate"),
      getValues("endDate")
    );
  };

  const configs = [
    {
      label: "#",
      render: (dto: GetListVariantChart) => dto.id,
    },
    {
      label: "variant's Name",
      render: (dto: GetListVariantChart) => dto.name,
    },
    {
      label: "Supplier's Name",
      render: (dto: GetListVariantChart) => dto.supplierName,
    },
    {
      label: "Sale Price",
      render: (dto: GetListVariantChart) => dto.salePrice,
    },
    {
      label: "Total Quantity",
      render: (dto: GetListVariantChart) => dto.totalQuantity,
    },
  ];

  console.log(data);

  const handlePageChange = (pageNumber: number) => {
    const tmp = returnRangDateNoTop(
      getValues("startDate"),
      getValues("endDate")
    );
    GetListVariantInRange(tmp, pageNumber, PAGE_LIMIT_CHART_VARIANT)
      .then((res) => {
        if (res?.data) {
          setTable(res?.data.items);
          setPageObject(res?.data.page);
        }
      })
      .catch((error) => toast.error(error));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(clickSubmit)}>
        <div className="row  mt-5 m-5 ">
          <div className="col-1 col ">
            <div className="">
              <h5>Top:</h5>
              <input
                type="number"
                min={1}
                step={1}
                placeholder="top"
                className="form-control"
                id="top"
                {...register("top")}
              />
              {errors.top && toast.error(errors?.top.message)}
            </div>
          </div>
          <div className="col-5 col  ">
            <div className="">
              <h5>start date:</h5>
              <input
                type="date"
                placeholder="Start Date"
                className="form-control"
                id="startDate"
                {...register("startDate")}
              />
              {errors.startDate && toast.error(errors?.startDate.message)}
            </div>
          </div>
          <div className="col-6  col  ">
            <div className="">
              <h5>End date:</h5>
              <div className="d-flex">
                <input
                  type="date"
                  placeholder="End Date"
                  className="form-control"
                  id="endDate"
                  {...register("endDate")}
                />
                <div className="col-1 col">
                  <div className="">
                    <input
                      type="submit"
                      className="btn btn-primary "
                      id="submit"
                      value={"Filter"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {data && data.length > 0 && (
        <div className=" m-2 p-2 rounded shadow  row bg-light">
          <div className="col  col-6  shadow ml-4 bg-light rounded ">
            <BarChartTop data={data} />
          </div>
          <div className="col  ml-5 col-5 shadow bg-light rounded ">
            <PieChartTop data={data} />
          </div>
        </div>
      )}

      <div className="container rounded shadow mt-5 bg-light-subtle p-4 m-2">
        <h2>
          Danh sách thống kê sản phẩm đã bán trong khoảng{" "}
          {getValues("startDate")} đến {getValues("endDate")}{" "}
        </h2>
        {table && table.length > 0 && <Table configs={configs} data={table} />}
       <div className="mb-2">
       {pageObject && (
          <Paging
            currentPage={pageObject?.currentPage!}
            onPageChange={handlePageChange}
            pageSize={pageObject?.pageSize!}
            totalItems={pageObject?.totalItems!}
            totalPages={pageObject?.totalPages!}
          />
        )}
       </div>
      </div>
    </div>
  );
};

export default ReportChart;
