CREATE TYPE "public"."job_status" AS ENUM('draft', 'published', 'closed');--> statement-breakpoint
CREATE TABLE "companies" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "companies_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"location" text NOT NULL,
	"href" text DEFAULT '#' NOT NULL,
	"logo_url" text,
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "jobs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"company_id" integer NOT NULL,
	"title" text NOT NULL,
	"type" text NOT NULL,
	"level" text,
	"location" text,
	"remote" boolean DEFAULT false NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"status" "job_status" DEFAULT 'draft' NOT NULL,
	"salary" text,
	"salary_range" text,
	"salary_type" text,
	"education" text,
	"experience" text,
	"posted_at" date,
	"deadline" date,
	"description" text NOT NULL,
	"responsibilities" text[] DEFAULT '{}'::text[] NOT NULL,
	"requirements" text[] DEFAULT '{}'::text[] NOT NULL,
	"desirable" text[] DEFAULT '{}'::text[] NOT NULL,
	"benefits" text[] DEFAULT '{}'::text[] NOT NULL,
	"perks" text[] DEFAULT '{}'::text[] NOT NULL,
	"tags" text[] DEFAULT '{}'::text[] NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "jobs_status_idx" ON "jobs" USING btree ("status");--> statement-breakpoint
CREATE INDEX "jobs_company_idx" ON "jobs" USING btree ("company_id");