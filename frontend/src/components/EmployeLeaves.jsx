import "./EmployeLeaves.css";
import React, { useEffect, useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
import HTTP from "../config/Axios";
import { useHistory } from "react-router";
import moment from "moment";

const EmployeLeaves = () => {
  const history = useHistory();

  const [empLeaves, setEmpleaves] = useState([]);

  useEffect(() => {
    const url = "/allLeaves";
    HTTP.get(url).then((res) => {
      setEmpleaves(res.data.leaves);
    });
  }, []);

  const goBack = () => {
    history.push({
      pathname: "/allUsers",
    });
  };

  // Approve Leave
  const approve = (id) => {
    const url = `/approveLeave/${id}`;
    HTTP.post(url)
      .then((data) => {
        alert("Leave Approved");
        window.location.reload();
      })
      .catch((err) => {
        alert("Failed");
      });
  };

  // Reject Leave
  const reject = (id) => {
    const url = `/rejectLeave/${id}`;
    HTTP.post(url)
      .then((data) => {
        alert("Leave Rejected");
        window.location.reload();
      })
      .catch((err) => {
        alert("Failed");
      });
  };

  const setDatas = () => {
    const data = {
      columns: [
        {
          label: "Emp.Name",
          field: "name",
          sort: "asc",
        },
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
        {
          label: "Approve / Reject",
          field: "actions",
        },
      ],
      rows: [],
    };

    empLeaves &&
      empLeaves.forEach((leave, index) => {
        data.rows.push({
          name: leave.name,
          applyDate: leave.applyDate,
          fromDate: moment(leave.fromDate).format("DD-MM-YYYY"),
          toDate: moment(leave.toDate).format("DD-MM-YYYY"),
          reason: leave.reason,
          status: leave.status,
          actions: (
            <>
              <tr key={index}>
                <td>
                  <button
                    className="leaveBtn"
                    onClick={() => approve(leave._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="leaveBtn"
                    onClick={() => reject(leave._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            </>
          ),
        });
      });

    return data;
  };

  return (
    <>
      <>
        <div className="row">
          <div></div>
          <div>
            <>
              <h3 className="my-5" style={{ textAlign: "center" }}>
                Employee Leaves
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
                searchTop
                searchBottom={false}
              />
            </>
          </div>
        </div>
      </>
    </>
  );
};

export default EmployeLeaves;
