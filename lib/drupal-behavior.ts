import {Fakelink} from "./fake-link";

class FakelinkDrupalBehavior {
  attach(context: Element|Document) {
    console.log(context);
    new Fakelink(context)
  }
  detach() {}
}

export const FakelinkDrupalBehaviorInstance = new FakelinkDrupalBehavior()