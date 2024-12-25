import { Stack } from "react-bootstrap";
import { FaWpforms } from "react-icons/fa6";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <Stack
      direction="horizontal"
      gap={2}
      className="align-items-center justify-content-center"
    >
      <FaWpforms className={styles.icon} />
      <h1>Form Builder</h1>
    </Stack>
  );
};

export default Header;
