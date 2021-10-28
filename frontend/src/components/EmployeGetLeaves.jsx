import { MDBDataTableV5 } from "mdbreact";
import React, { useEffect, useState } from "react";
import HTTP from "../config/Axios";
import "./EmployeGetLeaves.css";
import { useHistory } from "react-router";
import moment from "moment";

const EmployeGetLeaves = (props) => {
  // console.log(props.location.props._id);
  const history = useHistory();

  const [empLeaves, setEmpLeaves] = useState([]);

  const url = `/getLeaves/${props.location.props._id}`;

  useEffect(() => {
    HTTP.get(url).then((res) => {
      setEmpLeaves(res.data.leaves);
    });
  }, []);

  const setDatas = () => {
    const data = {
      columns: [
        {
          label: "Apply Date",
          field: "applyDate",
          sort: "asc",
        },
        {
          label: "From Date",
          field: "fromDate",
          sort: "asc",
        },
        {
          label: "To Date",
          field: "toDate",
          sort: "asc",
        },
        {
          label: "Reason",
          field: "reason",
          sort: "asc",
        },
        {
          label: "Leave Status",
          field: "status",
          sort: "asc",
        },
      ],
      rows: [],
    };

    empLeaves &&
      empLeaves.forEach((leave, index) => {
        data.rows.push({
          applyDate: leave.applyDate,
          fromDate: moment(leave.fromDate).format("DD-MM-YYYY"),
          toDate: moment(leave.toDate).format("DD-MM-YYYY"),
          reason: leave.reason,
          status: leave.status,
        });
      });

    return data;
  };

  const goBack = () => {
    history.push({
      pathname: "/myDetails",
      props: { _id: props.location.props._id },
    });
  };

  return (
    <>
      <>
        <div className="row">
          <div></div>
          <div>
            <>
              <h3 className="my-5" style={{ textAlign: "center" }}>
                My Leaves
              </h3>
              <button className="bkBtn" onClick={goBack}>
                back
              </button>

              <div></div>
              <MDBDataTableV5
                data={setDatas()}
                className="px-3 "
                bordered
                striped
                searching={false}
              />
            </>
          </div>
        </div>
      </>
    </>
  );
};
export default EmployeGetLeaves;
