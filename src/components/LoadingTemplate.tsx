import { LoadingState } from "../store/types";

type LoadingWrapperProps = {
  length?: number;
} & React.PropsWithChildren;

export function LoadingWrapper({ children, length = 24 }: LoadingWrapperProps) {
  return Array.from({ length }).map(() => children);
}

LoadingWrapper.isTemplate = true;

type LoadingTemplateProps = {
  state: LoadingState;
  success: () => React.ReactNode;
  failed: React.ReactNode;
  loading: React.ReactNode;
};

export default function LoadingTemplate({
  state,
  loading,
  success,
  failed,
}: LoadingTemplateProps) {
  return state === "success"
    ? success()
    : state === "failed"
    ? failed
    : loading;
}
