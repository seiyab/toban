import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import { RoleList as PureRoleList } from ".";
import { withQueryClient } from "@/fetch/provider/withQueryClient";

const RoleList = withQueryClient<React.ComponentProps<typeof PureRoleList>>()(
  PureRoleList
);

describe("RoleList", () => {
  it("rendering", async () => {
    render(<RoleList />);
    await waitFor(() => {
      expect(screen.getByText("role-0")).toBeInTheDocument();
      expect(screen.getByAltText("+1")).toBeInTheDocument();
    });
  });
});
