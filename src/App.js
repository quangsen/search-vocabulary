import { Button, Checkbox, Col, Input, message, Row } from "antd";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import "./App.scss";
import { formatDataExport, initState, myId } from "./help";
import LocalStorage from "./localStorage";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";

function App() {
  const [valueAdd, setValueAdd] = useState(initState);
  const [data, setData] = useState([]);
  const [dataShow, setDataShow] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [onlyItemCheckbox, setOnlyItemCheckbox] = useState({});

  useEffect(() => {
    let listdata = LocalStorage.get("list");
    if (!listdata || typeof listdata !== "object") listdata = [];
    listdata.map((item) => {
      item.checked = false;
      return item;
    });
    setData(listdata);
    setDataShow(listdata);
  }, []);

  const liCompF = (item, key) => {
    return (
      <li key={key}>
        {key + 1}.{" "}
        <Checkbox
          onChange={(e) => onChangeCheckbox(item?.valueEn, e.target.checked)}
          checked={item?.checked}
        ></Checkbox>
        <span style={{ color: "green", marginLeft: "7px" }}>
          {item.valueEn}
        </span>
        {item?.checked && item?.valueVi && (
          <span style={{ color: "blue", marginLeft: "7px" }}>
            ({item.valueVi})
          </span>
        )}
      </li>
    );
  };

  const renderListData = () => {
    if (!dataShow.length)
      return <li style={{ color: "green" }}>Không có từ nào!</li>;

    const results = [];
    dataShow.map((item, key) => {
      results.push(liCompF(item, key));
      return false;
    });

    return results;
  };

  const onChangeCheckbox = (valueCheck, value) => {
    let itemCheckbox = {};
    dataShow.map((item) => {
      if (valueCheck === item?.valueEn) {
        item.checked = value;
        itemCheckbox = item;
      }
      return item;
    });
    setDataShow([...dataShow]);
    setOnlyItemCheckbox(itemCheckbox);
  };

  const onChangeCheckedAll = (value) => {
    dataShow.map((item) => {
      item.checked = value;
      return item;
    });
    setDataShow([...dataShow]);
    !value && setOnlyItemCheckbox({});
  };

  const addData = () => {
    if (!valueAdd?.valueEn) return message.error("Vui lòng hãy nhập giá trị");

    // check dumplicate word
    let checkDumplicate = false;
    data.map((item) => {
      if (item?.valueEn?.toLowerCase() === valueAdd?.valueEn.toLowerCase())
        checkDumplicate = true;
      return item;
    });
    if (checkDumplicate) return message.error("Từ đó đã tồn tại");

    valueAdd.id = myId();
    // push data to localstorage
    data.push(valueAdd);
    LocalStorage.set("list", data);
    setValueAdd(initState);
  };

  const editData = () => {
    data.map((item) => {
      if (item?.id === onlyItemCheckbox?.id) {
        item.valueEn = onlyItemCheckbox.valueEn;
        item.valueVi = onlyItemCheckbox.valueVi;
      }
      return item;
    });
    LocalStorage.set("list", data);
    window.location.reload();
  };

  const onSearch = (value) => {
    if (!value) return setDataShow(data);

    const dataSearch = [];
    data.map((item) => {
      if (item?.valueEn?.toLowerCase().indexOf(value?.toLowerCase()) !== -1) {
        dataSearch.push(item);
      }
      return false;
    });
    setDataShow(dataSearch);
  };

  const deleteChecked = () => {
    const dataShowChecked = [];
    const dataShowNotChecked = [];
    dataShow.map((item) => {
      if (item?.checked) dataShowChecked.push(item?.valueEn);
      if (!item?.checked) dataShowNotChecked.push(item);
      return item;
    });
    // data
    const dataNotChecked = [];
    data.map((item) => {
      if (dataShowChecked.indexOf(item?.valueEn) === -1) {
        item.checked = false;
        dataNotChecked.push(item);
      }
      return item;
    });
    setDataShow(dataShowNotChecked);
    setData(dataNotChecked);
    LocalStorage.set("list", dataNotChecked);
  };

  const onClickEdit = () => {
    if (!Object.keys(onlyItemCheckbox)?.length)
      return message.error("Chưa chọn");
    setShowModalEdit(true);
  };

  console.log("vi sao", onlyItemCheckbox);

  return (
    <div className="App">
      <div className="container">
        <div className="input-app">
          <Row gutter={16}>
            <Col span={24}>
              <Input.Group compact>
                <Input
                  style={{ width: "calc(100% - 86px)" }}
                  placeholder="Nhập từ cần tìm kiếm"
                  onChange={(e) => onSearch(e.target.value)}
                />
                <Button type="primary" onClick={() => setShowModal(true)}>
                  Thêm từ
                </Button>
              </Input.Group>
            </Col>
          </Row>
        </div>
        <div className="list-app">
          <h3>
            <Checkbox
              onChange={(e) => onChangeCheckedAll(e.target.checked)}
            ></Checkbox>{" "}
            List of words {"  "}
            <Button danger onClick={deleteChecked}>
              Delete item Checked
            </Button>{" "}
            <Button onClick={onClickEdit}>Edit</Button>{" "}
            <CSVLink data={formatDataExport(data)}>
              <Button>Export File</Button>
            </CSVLink>
          </h3>
          <ul>{renderListData()}</ul>
        </div>
      </div>
      <ModalAdd
        showModal={showModal}
        setShowModal={setShowModal}
        addData={addData}
        valueAdd={valueAdd}
        setValueAdd={setValueAdd}
      />
      <ModalEdit
        showModalEdit={showModalEdit}
        setShowModalEdit={setShowModalEdit}
        onlyItemCheckbox={onlyItemCheckbox}
        setOnlyItemCheckbox={setOnlyItemCheckbox}
        editData={editData}
      />
    </div>
  );
}

export default App;
