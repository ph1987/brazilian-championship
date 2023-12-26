import { ThreeDots } from 'react-loader-spinner';
  
export default function SpinnerLoading(){ 
  return ( 
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#000"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  ) 
} 