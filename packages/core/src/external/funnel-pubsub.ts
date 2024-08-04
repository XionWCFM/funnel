import { Pubsub } from "../internal/pub-sub";
import type { FunnelEvent } from "./types";

export class FunnelPubsub extends Pubsub<FunnelEvent> {}
