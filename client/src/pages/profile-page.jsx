import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { useEffect } from "react";
import { Image } from "lucide-react";
import { Trash2 } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { ProfileSchema } from "@/validations/profile.validation";

const ProfilePage = () => {
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);

  const [previewImage, setPreviewImage] = useState("");

  const form = useForm({
    resolver: zodResolver(ProfileSchema),

    defaultValues: {
      fullName: "Anish Gane",
      email: "anish@example.com",
      bio: "Frontend developer passionate about MERN stack.",
      image: null,
    },
  });

  useEffect(() => {
    return () => {
      if (previewImage?.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleImageClick = () => {
    if (!isEditing) return;

    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    // save file in RHF
    form.setValue("image", file, {
      shouldValidate: true,
    });

    // cleanup previous blob
    if (previewImage?.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }

    // create preview
    const imageUrl = URL.createObjectURL(file);

    setPreviewImage(imageUrl);
  };

  const removeImage = () => {
    URL.revokeObjectURL(previewImage);
    form.setValue("image", null, {
      shouldValidate: true,
    });
    setPreviewImage("");
  };

  const onSubmit = (data) => {
    console.log(data);

    // later send to backend

    setIsEditing(false);
  };

  return (
    <main className="h-full w-full backdrop-blur-2xl border-2 border-border rounded-md overflow-hidden p-6">
      <div className="max-w-xl w-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-medium">Profile Details</h1>

          {isEditing ? (
            <div className="flex items-center gap-2">
              <Button
                onClick={form.handleSubmit(onSubmit)}
                className={"cursor-pointer px-4 py-5"}
              >
                Save
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                className={"cursor-pointer px-4 py-5"}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className={"cursor-pointer px-4 py-5"}
            >
              Edit Profile
            </Button>
          )}
        </div>

        <form className="space-y-6">
          <FieldGroup>
            {/* PROFILE IMAGE */}
            <Field>
              <FieldLabel>Profile Image</FieldLabel>

              <div className="flex items-center gap-4 z-20">
                <div
                  className={`
                    size-28 rounded-full border-2 border-border
                    flex items-center justify-center
                    bg-muted transition
                     relative select-none
                  `}
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile Preview"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1">
                      <Image className="size-8 text-muted-foreground" />
                    </div>
                  )}

                  {isEditing && (
                    <Button
                      type="button"
                      variant={previewImage ? "destructive" : "outline"}
                      onClick={() => {
                        if (previewImage) {
                          removeImage();
                        } else {
                          handleImageClick();
                        }
                      }}
                      className={`
                        absolute bottom-1 right-1
                        size-8 rounded-full
                        flex items-center justify-center
                        cursor-pointer transition
                        ${
                          previewImage
                            ? "bg-destructive/80 text-white hover:bg-destructive"
                            : "bg-background border border-border "
                        }
                      `}
                    >
                      {previewImage ? (
                        <Trash2 className="size-4" />
                      ) : (
                        <Upload className="size-4" />
                      )}
                    </Button>
                  )}
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Click image to upload
                  </p>

                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG, WEBP supported
                  </p>
                </div>
              </div>

              <Input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp"
                hidden
                onChange={handleImageChange}
              />
            </Field>

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
                    disabled={!isEditing}
                    placeholder="Enter your name"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* EMAIL */}
            <Controller
              name="email"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>

                  <Input
                    {...field}
                    id="email"
                    readOnly
                    disabled
                    className="opacity-70 cursor-not-allowed"
                  />
                </Field>
              )}
            />

            {/* BIO */}
            <Controller
              name="bio"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="bio">Bio</FieldLabel>

                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      disabled={!isEditing}
                      id="bio"
                      placeholder="Write something about yourself..."
                      className="min-h-32 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="text-xs text-muted-foreground">
                        {field.value.length}/120 characters left
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </div>
    </main>
  );
};

export default ProfilePage;
