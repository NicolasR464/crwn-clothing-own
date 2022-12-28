import { Group, FormInputLabel, Input } from "./form-input.styles";

const FormInput = ({ label, inputOptions }) => {
  return (
    <Group className="group">
      <Input className="form-input" {...inputOptions} />
      {label && (
        <FormInputLabel shrink={inputOptions.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
