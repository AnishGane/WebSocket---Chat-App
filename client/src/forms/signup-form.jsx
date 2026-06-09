import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormSchema } from "@/validations/auth.validation";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { EyeIcon } from "lucide-react";
import { EyeOffIcon } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ className, ...props }) => {
  const form = useForm({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      bio: "",
    },
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const { registerUser, authLoading } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const result = await registerUser(data);

      if (result.success) {
        toast.success(result.message);
        form.reset();

        navigate("/");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      <FieldGroup className={"gap-4"}>
        <div className="flex flex-col items-center gap-1 mb-4 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Sign up to get started
          </p>
        </div>

        {/* FULL NAME */}
        <Controller
          name="fullName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="fullName">Full Name</FieldLabel>

              <Input
                {...field}
                id="fullName"
                placeholder="John Doe"
                autoComplete="name"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* EMAIL */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>

              <Input
                {...field}
                id="email"
                type="email"
                placeholder="m@example.com"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* PASSWORD */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="password"
                  type={showPassword.password ? "text" : "password"}
                  placeholder="Enter password"
                  autoComplete="new-password"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      password: !prev.password,
                    }))
                  }
                  align="inline-end"
                >
                  {showPassword.password ? (
                    <EyeIcon className="cursor-pointer" />
                  ) : (
                    <EyeOffIcon className="cursor-pointer" />
                  )}
                </InputGroupAddon>
              </InputGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* CONFIRM PASSWORD */}
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>

              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="confirmPassword"
                  type={showPassword.confirmPassword ? "text" : "password"}
                  placeholder="Enter password"
                  autoComplete="new-password"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      confirmPassword: !prev.confirmPassword,
                    }))
                  }
                  align="inline-end"
                >
                  {showPassword.confirmPassword ? (
                    <EyeIcon className="cursor-pointer" />
                  ) : (
                    <EyeOffIcon className="cursor-pointer" />
                  )}
                </InputGroupAddon>
              </InputGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              <FieldDescription className={"text-xs italic"}>
                *Password must match with the password entered in above*
              </FieldDescription>
            </Field>
          )}
        />
        <Controller
          name="bio"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="bio">Enter your bio</FieldLabel>

              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  aria-invalid={fieldState.invalid}
                  id="bio"
                  placeholder="Enter a bio that describes you"
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="text-xs text-muted-foreground">
                    {field.value.length}/120 characters left
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* SUBMIT */}
        <Field>
          <Button type="submit" disabled={!form.formState.isValid || authLoading} className={"py-6! cursor-pointer"}>
            {authLoading ? "Signing up..." : "Sign up"}
          </Button>
        </Field>

        <Field>
          <FieldDescription className="text-center">
            Already have an account? Click on
            <span className="bg-foreground text-background py-1 px-2 mx-1.5 text-xs">
              Login
            </span>
            tab given above.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default SignupForm;
