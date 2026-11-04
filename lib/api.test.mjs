import assert from "node:assert/strict";
import { test } from "node:test";

process.env.NEXT_PUBLIC_LAURA_URL = "http://api.test";
const { apiGet, apiRequest, apiSend } = await import("./api.ts");

const repondre = (status, corps) => {
  globalThis.fetch = async () => new Response(corps && JSON.stringify(corps), { status });
};

test("apiGet : données, null sur 404, erreur sinon", async () => {
  repondre(200, [1]);
  assert.deepEqual(await apiGet("/x"), [1]);
  repondre(404, { detail: "Introuvable." });
  assert.equal(await apiGet("/x"), null);
  repondre(500);
  await assert.rejects(apiGet("/x"), /HTTP 500/);
});

test("apiSend : null si ok, sinon un message affichable", async () => {
  repondre(204);
  assert.equal(await apiSend("/x", "DELETE"), null);
  repondre(409, { detail: "Slug pris." });
  assert.equal(await apiSend("/x", "POST", {}), "Slug pris.");
  repondre(422, { detail: [{ msg: "liste Pydantic" }] });
  assert.equal(await apiSend("/x", "POST", {}), "Une erreur est survenue.");
  repondre(502);
  assert.equal(await apiSend("/x", "POST", {}), "Une erreur est survenue.");
  globalThis.fetch = async () => {
    throw new TypeError("fetch failed");
  };
  assert.equal(await apiSend("/x", "POST", {}), "Service indisponible, veuillez réessayer.");
});

test("apiRequest : renvoie la réponse, ou l'erreur sans données", async () => {
  repondre(200, { token: "abc" });
  assert.deepEqual(await apiRequest("/x", "POST", {}), { data: { token: "abc" }, error: null });
  repondre(401, { detail: "Mot de passe incorrect." });
  assert.deepEqual(await apiRequest("/x", "POST", {}), {
    data: null,
    error: "Mot de passe incorrect.",
  });
  repondre(204);
  assert.deepEqual(await apiRequest("/x", "GET"), { data: null, error: null });
});
