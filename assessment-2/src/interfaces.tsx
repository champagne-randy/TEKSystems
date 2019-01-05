import { FormEvent } from "react";

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
  adult: {
    value: number;
    touched: boolean;
  };
  child: {
    value: number;
    touched: boolean;
  };
  isValid: false;
}

export interface Room extends RoomData {
  requests: RoomRequests;
  isActive: boolean;
  isRequired: boolean;
}

export interface AppState {
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
    adult?: { value: number; touched: boolean };
    child?: { value: number; touched: boolean };
  };
}

export interface RequestsUpdateHandler {
  (payload: RequestsUpdatePayload): void;
}

export interface FormSubmitHandler {
  ({ event }: { event: FormEvent<HTMLFormElement> }): void;
}

export interface RoomProps {
  name: string;
  label: string;
  isActive?: boolean;
  toggleRoomActivation: RoomActivationHandler;
  isRequired?: boolean;
  requests: RoomRequests;
  updateRoomRequests: RequestsUpdateHandler;
  vacancies: Vacancies;
}

export interface RoomRequestFormProps {
  rooms: Room[];
  toggleRoomActivation: RoomActivationHandler;
  updateRoomRequests: RequestsUpdateHandler;
  handleFormSubmit: FormSubmitHandler;
}
