import { TailSpin } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <TailSpin
      height="100"
      width="100"
      color="#174ea6"
      ariaLabel="tail-spin-loading"
      radius="2"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};
export default LoadingSpinner;
