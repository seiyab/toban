import { useQuery, UseQueryResult } from "react-query";
import { Member, Role } from "@/fetch/openapi";
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

export function useRoles(): UseQueryResult<Role[]> {
  const keys = ["useRoles"];
  return useQuery(keys, () => client.getRoles());
}
