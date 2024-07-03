import mongoDB from "../databases/mongo.js";
import Assert from "assert";
import supertest from "supertest";
import * as chai from "chai";

export const assert = Assert.strict;

export const expect = chai.expect;

export const requester = supertest("http://localhost:3000");