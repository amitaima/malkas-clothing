import "./button.styles.scss";

export const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({
  children,
  className,
  buttonType,
  isLoading,
  ...otherProps
}) => {
  return (
    <button
      disabled={isLoading}
      className={`button-container ${className} ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {isLoading ? <div className="btn-spinner-container"></div> : children}
    </button>
  );
};

export default Button;
