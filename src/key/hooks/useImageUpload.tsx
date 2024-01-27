import { useEffect, useRef, useState } from "react";

type Props = {
  name: string;
  handleChange: (e: any) => void;
  image: string | null;
  handleImageReset: () => void;
};

export const useImageUpload = ({
  handleChange,
  handleImageReset,
  image,
  name,
}: Props) => {
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];

    if (file && !file.type.startsWith("image/")) {
      return;
    }

    if (file) {
      const syntheticEvent = {
        target: {
          name: name,
          value: file,
        },
      };

      handleChange(syntheticEvent);
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && !file.type.startsWith("image/")) {
      return;
    }

    const syntheticEvent = {
      target: {
        name: name,
        value: file,
      },
    };

    handleChange(syntheticEvent);
  };

  const onRemoveImage = () => {
    setPreviewImage(null);
    inputRef.current!.value = "";
    handleImageReset();
  };

  useEffect(() => {
    if (!image || typeof image != "object") {
      setPreviewImage(null);
      inputRef.current!.value = "";
      return;
    }

    const file = new FileReader();

    file.onload = function () {
      setPreviewImage(file.result);
    };

    file.readAsDataURL(image as Blob);
  }, [image]);

  useEffect(() => {
    if (image) {
      setPreviewImage(import.meta.env.VITE_BACKEND_PUBLIC_URL + image);
    }
  }, []);

  return {
    previewImage,
    inputRef,
    onDragOver,
    onDrop,
    onFileInputChange,
    onRemoveImage,
  };
};
