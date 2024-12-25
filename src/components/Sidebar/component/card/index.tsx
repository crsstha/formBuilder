import Card, { CardProps } from "react-bootstrap/Card";
import styles from "./styles.module.scss";

export interface FormBuilderCardProps extends CardProps {
  className?: string;
  variant?: "outline" | "shadow";
  full?: boolean;
  padding?: "sm" | "md" | "lg";
}

const cardVariant = {
  outline: "formBuilder-card--outline",
  shadow: "formBuilder-card--shadow",
  full: "formBuilder-card--full",
};

const paddingVariant = {
  sm: "formBuilder-card--padding-sm",
  md: "formBuilder-card--padding-md",
  lg: "formBuilder-card--lg",
};

const FormBuilderCard = ({
  children,
  variant,
  className,
  full,
  padding,
  ...rest
}: FormBuilderCardProps) => (
  <Card
    {...rest}
    className={`${styles["formBuilder"]} ${
      variant ? styles[cardVariant[variant]] : ""
    } 
     ${full ? styles[cardVariant.full] : ""}
     ${padding ? styles[paddingVariant[padding]] : styles[paddingVariant.md]}
     ${className}`}
  >
    {children}
  </Card>
);

export default FormBuilderCard;
