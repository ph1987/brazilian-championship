export interface ErrorProps {
  children: React.ReactNode;
}
function Error({ children: errorMessage } : ErrorProps) {
  return (
    <span className="bg-red-300 text-red-900 font-semibold p-2">
      {errorMessage}
    </span>
  )
}

export default Error;