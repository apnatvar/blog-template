import config from "@/app/(payload)/payload.config";
import { getPayload, type Payload } from "payload";

let cached: Payload | null = null;

export async function getPayloadClient(): Promise<Payload> {
  if (!cached) {
    cached = await getPayload({ config });
  }
  return cached;
}
