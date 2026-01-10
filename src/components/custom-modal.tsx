import ReactModal from "react-modal"
ReactModal.setAppElement("#root");

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const CustomModal = ({ isOpen, onClose, children }: Props) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      className="modal-content"
      style={{
        overlay: {
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          left: "10px",
          right: "10px",
          margin: "auto",
          padding: "1.2rem",
          borderRadius: "16px",
          overflow: "hidden"
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default CustomModal;
