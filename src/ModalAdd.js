import { Input, Modal } from "antd";
import { initState } from "./help";

const ModalAdd = ({
  showModal,
  setShowModal,
  addData,
  setValueAdd,
  valueAdd,
}) => {
  const onChange = (value, field) => {
    setValueAdd({ ...valueAdd, [field]: value });
  };

  return (
    <Modal
      title="Thêm từ mới"
      centered
      visible={showModal}
      onOk={() => addData()}
      onCancel={() => {
        setShowModal(false);
        setValueAdd(initState);
      }}
      maskClosable={false}
    >
      <Input
        placeholder="Nhập En"
        onChange={(e) => onChange(e.target.value, "valueEn")}
        value={valueAdd?.valueEn}
        onPressEnter={addData}
      />
      <br />
      <br />
      <Input
        placeholder="Nhập Vi"
        onChange={(e) => onChange(e.target.value, "valueVi")}
        value={valueAdd?.valueVi}
        onPressEnter={addData}
      />
    </Modal>
  );
};

export default ModalAdd;
