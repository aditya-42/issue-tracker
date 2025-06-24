"use client";
import React from "react";
import { Controller, useForm, Resolver } from "react-hook-form";
import { Button, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import axios from "axios";

type FormValues = {
  title: string;
  description: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  const errors: any = {};
  if (!values.title) {
    errors.title = {
      type: "required",
      message: "Please enter title of the issue",
    };
  }
  if (!values.description) {
    errors.description = {
      type: "required",
      message: "Please enter a description",
    };
  }
  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};

function NewIssuePage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const router = useRouter();
  const onSubmit = handleSubmit((data) => {
    axios.post("/api/issues", data);
    router.push("/issues");
  });
  return (
    <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
      <TextField.Root
        placeholder="Title"
        {...register("title")}
      ></TextField.Root>
      {errors?.title && <p className="text-red-500">{errors.title.message}</p>}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      {errors?.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}
      <Button>Submit new issue</Button>
    </form>
  );
}

export default NewIssuePage;
