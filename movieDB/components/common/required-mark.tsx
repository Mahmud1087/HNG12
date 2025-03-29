const CustomizeRequiredMark = (
  label: React.ReactNode,
  { required }: { required: boolean },
) => (
  <>
    {required ? "" : ""}
    {label}
  </>
);

export default CustomizeRequiredMark;
