import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { Member, New, Role } from "@/fetch/openapi";
import { client } from "../client";

export function useMember(memberID: number): UseQueryResult<Member> {
  const keys = ["useMember", memberID];
  return useQuery(keys, () =>
    client.getMembersMemberId({
      memberId: memberID,
    })
  );
}

export function useMembers(): UseQueryResult<Member[]> {
  const keys = ["useMembers"];
  return useQuery(keys, () => client.getMembers());
}

export function useNewMember(): UseMutationResult<
  New,
  unknown,
  Omit<Member, "id">
> {
  const queryClient = useQueryClient();
  return useMutation(
    (member: Omit<Member, "id">) => client.postMembers({ newMember: member }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("useMembers");
      },
    }
  );
}

export function useRoles(): UseQueryResult<Role[]> {
  const keys = ["useRoles"];
  return useQuery(keys, () => client.getRoles());
}

export function useNewRole(): UseMutationResult<
  New,
  unknown,
  Omit<Role, "id">
> {
  const queryClient = useQueryClient();
  return useMutation(
    (role: Omit<Role, "id">) => client.postRoles({ newRole: role }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("useRoles");
      },
    }
  );
}
