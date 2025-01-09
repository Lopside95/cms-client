import { FormInput } from "@/utils/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";

const NumberField = ({ name, type, label }: FormInput) => {
  const { control, register } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <FormItem className="">
            <FormLabel>{label}</FormLabel>
            <FormMessage />
            <FormControl>
              <Input
                {...field}
                {...register(name, { valueAsNumber: true })}
                className="w-80"
                type="number"
              />
            </FormControl>
          </FormItem>
        </>
      )}
    />
  );
};

export default NumberField;
