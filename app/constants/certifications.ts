interface CertificationListItem {
	id: string;
	title: string;
	description?: string;
	examination: boolean;
}

export const certifications = [
	{
		id: "ce473dba-1f3a-4020-af61-0020f83c5aa3",
		title: "基本情報技術者試験 (FE)",
		description:
			"IT エンジニアの登竜門とされる国家試験です。 IT 人材に必要な基本的な知識・技能を持ち、実践的な活用能力を有することが求められます。",
		examination: true,
	},
	{
		id: "494aa6df-ebb1-4e30-b48c-8ee414bc3bec",
		title: "応用情報技術者試験 (AP)",
		description:
			"基本情報技術者試験のワンランク上の国家試験で、より実践的・応用的な知識が問われます。 自分で IT 戦略を考えたり、システムの設計や開発を行ったりする能力が求められます。",
		examination: true,
	},
	{
		id: "cf84f73c-374a-4dc9-8382-531ac636590b",
		title: "情報処理安全確保支援士試験 (SC)",
		description:
			"サイバー攻撃や情報漏洩といった脅威から、会社や組織の大切な情報を守る「セキュリティの専門家」になるための国家試験です。 ハッキングの手口や、それを防ぐための高度な技術・法律の知識が問われます。 IT 資格の中でも特にセキュリティ分野に特化した、難易度の高い資格です。",
		examination: true,
	},
	{
		id: "f5e5144c-47fc-4e8e-8c16-834657231076",
		title: "登録セキスぺ",
		description:
			"情報処理安全確保支援士試験に合格し、国に登録手続きを行うことで名乗ることができる国家資格です。 情報系の資格としては唯一の士業であり、保有し続けるには毎年の講習を受ける必要があります。",
		examination: false,
	},
] as const satisfies CertificationListItem[];
