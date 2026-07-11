import { MaterialIssueItemResponse } from "./material-issue-item-response";

export interface MaterialIssueResponse {

      id: number;

  issueNo: string;

  issueDate: string;

  department: string;

  requestedBy: string;

  remarks: string;

  status: string;

  items: MaterialIssueItemResponse[];
}
