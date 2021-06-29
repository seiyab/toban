import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { Temporal } from "proposal-temporal";

import {
  Assignment as AssignmentResponse,
  Member,
  New,
  Role,
} from "@/fetch/openapi";
import { Assignment } from "@/domain/assignment";
import { dateToPlainDate, plainDateToDate } from "../transfer";
import { client } from "../client";
import { AsyncResult } from "@/general/reactQuery";

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

export function useAssignments(
  from: Temporal.PlainDate,
  to: Temporal.PlainDate
): AsyncResult<Assignment[]> {
  const keys = ["useAssignment", from.toString(), to.toString()];
  const response = useQuery(keys, () =>
    client.getAssignments({
      from: plainDateToDate(from),
      to: plainDateToDate(to),
    })
  );
  return AsyncResult.map((rs: AssignmentResponse[]) =>
    rs.map((r) => ({
      ...r,
      startAt: dateToPlainDate(r.startAt),
      endAt: dateToPlainDate(r.endAt),
    }))
  )(response);
}
