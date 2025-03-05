import * as pulumi from "@pulumi/pulumi";
import * as random from "@pulumi/random";

// Generate a random integer between 1 and 100
const randomNumber = new random.RandomInteger("randomNumber", {
    min: 1,
    max: 100,
});

// RandomString forces a replace every run due to keepers changing with the current timestamp
const alwaysChanging = new random.RandomString("alwaysChanging", {
    length: 16,
    keepers: {
        timestamp: new Date().toISOString(),
    },
});

// A few more resources that depend on the changing one, to generate more engine events
const derived1 = new random.RandomPet("derived1", {
    keepers: {
        value: alwaysChanging.result,
    },
});

const derived2 = new random.RandomId("derived2", {
    byteLength: 8,
    keepers: {
        value: alwaysChanging.result,
    },
});

// Export the results
export const result = randomNumber.result;
export const changingValue = alwaysChanging.result;
export const petName = derived1.id;
export const uniqueId = derived2.hex;
