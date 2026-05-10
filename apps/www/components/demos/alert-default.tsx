import { Alert, AlertTitle, AlertDescription } from "@/components/mdx/alert";

export default function AlertDefault() {
  return (
    <div className="w-full space-y-3">
      <Alert variant="info">
        <AlertTitle>New version available</AlertTitle>
        <AlertDescription>
          Run npm update to get the latest features and fixes.
        </AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Deprecation notice</AlertTitle>
        <AlertDescription>
          This API will be removed in the next major version. Please migrate to
          the new one.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Build failed</AlertTitle>
        <AlertDescription>
          There were 3 errors during compilation. Check the logs for details.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Deployed successfully</AlertTitle>
        <AlertDescription>
          Your changes are live at production.
        </AlertDescription>
      </Alert>
    </div>
  );
}
