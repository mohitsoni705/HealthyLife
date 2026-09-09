type CalendlyAvailability = { start_time: string; status?: string };

type CalendlyInvitee = {
  uri: string;
  event: string;
  status: string;
  start_time: string;
  cancel_url?: string;
  reschedule_url?: string;
};

export class CalendlyServiceError extends Error {
  constructor(message: string,statusCode:number) {
    super(message);
  }
}

export default class CalendlyService {
  private readonly baseUrl = "https://api.calendly.com";

  private token(): string {
    const token = process.env.CALENDLY_ACCESS_TOKEN;
    if (!token) {
      throw new CalendlyServiceError("Calendly is not configured", 503);
    }
    return token;
  }

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    let response: Response;
    try {
      response = await fetch(`${this.baseUrl}${path}`, {
        ...init,
        headers: {
          Authorization: `Bearer ${this.token()}`,
          "Content-Type": "application/json",
          ...init.headers,
        },
      });
    } catch {
      throw new CalendlyServiceError("Calendly is currently unavailable",501);
    }

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new CalendlyServiceError("Calendly authorization or plan does not permit this action", 503);
      }
      if (response.status === 400 || response.status === 404 || response.status === 409 || response.status === 422) {
        throw new CalendlyServiceError("The selected time slot is no longer available", 409);
      }
      throw new CalendlyServiceError("Calendly could not complete the request",503);
    }
    return (await response.json()) as T;
  }

  async getAvailability(eventTypeUri: string, date: string): Promise<CalendlyAvailability[]> {
    const start = `${date}T00:00:00.000Z`;
    const end = `${date}T23:59:59.999Z`;
    const params = new URLSearchParams({
      event_type: eventTypeUri,
      start_time: start,
      end_time: end,
    });
    const result = await this.request<{ collection?: CalendlyAvailability[] }>(
      `/event_type_available_times?${params.toString()}`,
    );
    return result.collection || [];
  }

  async createBooking(input: {
    eventTypeUri: string;
    startTime: string;
    name: string;
    email: string;
    timezone: string;
    reason?: string;
  }): Promise<CalendlyInvitee> {
    const result = await this.request<{ resource: CalendlyInvitee }>("/invitees", {
      method: "POST",
      body: JSON.stringify({
        event_type: input.eventTypeUri,
        start_time: input.startTime,
        invitee: { name: input.name, email: input.email, timezone: input.timezone },
      }),
    });
    return result.resource;
  }
}
