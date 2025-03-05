import * as pulumi from "@pulumi/pulumi";
import * as random from "@pulumi/random";

// Generate a random integer between 1 and 100
const randomNumber = new random.RandomInteger("randomNumber", {
    min: 1,
    max: 100,
});

// Export the result
export const result = randomNumber.result;
