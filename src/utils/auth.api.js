import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./api-client";

export const useCreateInventory = () => {
  const queryClient = useQueryClient();
  const create = async (data) => {
    const response = await client("auth/createInventory", {
      method: "POST",
      data: data,
    });

    if (response.error) {
      throw new Error(response.error);
    }
    queryClient.invalidateQueries(["getInventory"]);
  };

  return useMutation(create);
};

export const useEditInventory = () => {
  const queryClient = useQueryClient();
  const edit = async (data) => {
    console.log(data);
    const response = await client(`auth/editInventory/${data?.id}`, {
      method: "POST",
      data: data,
    });

    if (response.error) {
      throw new Error(response.error);
    }
    queryClient.invalidateQueries(["getInventory"]);
  };

  return useMutation(edit);
};

export const useDeleteInventory = () => {
  const queryClient = useQueryClient();
  const edit = async (id) => {
    const response = await client(`auth/deleteInventory/${id}`, {
      method: "POST",
    });

    if (response.error) {
      throw new Error(response.error);
    }
    queryClient.invalidateQueries(["getInventory"]);
  };

  return useMutation(edit);
};

export const useGetInventory = () => {
  return useQuery(["getInventory"], async () => {
    const response = await client(`auth/getInventory`);
    return response;
  });
};

export const useGetBill = () => {
  return useQuery(["getBill"], async () => {
    const response = await client(`auth/getBill`);
    return response;
  });
};

export const useCreateBill = () => {
  const queryClient = useQueryClient();
  const create = async (data) => {
    const response = await client("auth/createBill", {
      method: "POST",
      data: data,
    });

    if (response.error) {
      throw new Error(response.error);
    }
    queryClient.invalidateQueries(["getBill"]);
  };

  return useMutation(create);
};
