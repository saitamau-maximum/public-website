// schema.json とまったく同じ内容だが、 ts で json がインポートされるときに const な型情報が失われてしまうので ts として定義
// refs:
// - https://github.com/ThomasAribart/json-schema-to-ts/blob/main/documentation/FAQs/does-json-schema-to-ts-work-on-json-file-schemas.md
// - https://github.com/microsoft/TypeScript/issues/32063

export default {
	$schema: "https://json-schema.org/draft/2020-12/schema",
	title: "ICPC Achievements Schema",
	type: "object",
	patternProperties: {
		"^20\\d{2}$": {
			type: "object",
			properties: {
				teams: {
					type: "array",
					items: {
						type: "object",
						properties: {
							name: { type: "string" },
							prelim: { type: "string" },
							regional: { type: "string" },
							playoff: { type: "string" },
							worldfinal: { type: "string" },
						},
						required: ["name"],
						additionalProperties: false,
					},
					minItems: 1,
				},
				blogs: {
					type: "array",
					items: {
						type: "object",
						properties: {
							author: { type: "string" },
							title: { type: "string" },
							url: { type: "string", format: "uri" },
						},
						required: ["author", "title", "url"],
						additionalProperties: false,
					},
					minItems: 1,
				},
			},
			required: ["teams"],
			additionalProperties: false,
		},
	},
	additionalProperties: false,
} as const;
