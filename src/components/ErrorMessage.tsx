import { Alert } from "flowbite-react";
import { ReactNode } from "react";
import { HiInformationCircle } from "react-icons/hi";

type ErrorMessageProps = {
  children: ReactNode;
};
export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <Alert color="failure" icon={HiInformationCircle}>
      {children}
    </Alert>
  );
}
