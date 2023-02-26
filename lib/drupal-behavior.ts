import {Fakelink} from "./fake-link";

class FakelinkDrupalBehavior {
    attach(context: HTMLElement | Document): void {
        new Fakelink(context)
    }

    detach() {
        // Nothing to do.
    }
}

export const FakelinkDrupalBehaviorInstance = new FakelinkDrupalBehavior()