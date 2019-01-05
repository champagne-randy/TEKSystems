export interface Vacancies {
  adult: number;
  child: number;
}

export interface RoomData {
  name: string;
  key: string;
  label: string;
  vacancies: Vacancies;
}

export interface RoomRequests {
  adult: number;
  child: number;
}

export interface Room extends RoomData {
  requests: RoomRequests;
  isActive: boolean;
  isRequired: boolean;
}

export interface RoomRequestFormState {
  readonly rooms: Room[];
}

export interface RoomActivationPayload {
  event: {
    target: {
      name: string;
      checked: boolean;
    };
  };
}

export interface RoomActivationHandler {
  (payload: RoomActivationPayload): void;
}

export interface RequestsUpdatePayload {
  name: string;
  data: {
    adult?: number;
    child?: number;
  };
}

export interface RequestsUpdateHandler {
  (payload: RequestsUpdatePayload): void;
}

export interface RoomRequestsSubmissionPayload {
  name: string;
  requests: RoomRequests;
}

export interface RoomProps {
  name: string;
  label: string;
  isActive?: boolean;
  toggleRoomActivation: RoomActivationHandler;
  isRequired?: boolean;
  updateRoomRequests: RequestsUpdateHandler;
  vacancies: Vacancies;
  requests: RoomRequests;
}
