import { Input, Modal } from "antd";
import { initState } from "./help";

const ModalEdit = ({
  onlyItemCheckbox,
  showModalEdit,
  setOnlyItemCheckbox,
  setShowModalEdit,
  editData,
}) => {
  const onChange = (value, field) => {
    setOnlyItemCheckbox({ ...onlyItemCheckbox, [field]: value });
  };

  return (
    <Modal
      title="Sửa từ"
      centered
      visible={showModalEdit}
      onOk={() => editData()}
      onCancel={() => {
        setShowModalEdit(false);
      }}
      maskClosable={false}
    >
      <Input
        placeholder="Nhập En"
        onChange={(e) => onChange(e.target.value, "valueEn")}
        value={onlyItemCheckbox?.valueEn}
        onPressEnter={editData}
      />
      <br />
      <br />
      <Input
        placeholder="Nhập Vi"
        onChange={(e) => onChange(e.target.value, "valueVi")}
        value={onlyItemCheckbox?.valueVi}
        onPressEnter={editData}
      />
    </Modal>
  );
};

export default ModalEdit;
