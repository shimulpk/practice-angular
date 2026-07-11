import { MaterialIssueItemRequest } from "./material-issue-item-request";

export interface MaterialIssueRequest {

     issueDate: string;

  department: string;

  requestedBy: string;

  remarks: string;

  items: MaterialIssueItemRequest[];
}
