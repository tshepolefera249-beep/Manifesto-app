import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Government Hub Functions
 * Handles queries for leaders, departments, projects, and parliament
 */

// Get all leaders
export const getLeaders = query({
  args: {
    limit: v.optional(v.number()),
    party: v.optional(v.string()),
    position: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    
    let leaders;
    if (args.party) {
      leaders = await ctx.db
        .query("leaders")
        .withIndex("by_party", (q) => q.eq("party", args.party))
        .take(limit);
    } else if (args.position) {
      leaders = await ctx.db
        .query("leaders")
        .withIndex("by_position", (q) => q.eq("position", args.position))
        .take(limit);
    } else {
      leaders = await ctx.db
        .query("leaders")
        .take(limit);
    }

    return leaders;
  },
});

// Get leader by ID
export const getLeader = query({
  args: {
    leaderId: v.id("leaders"),
  },
  handler: async (ctx, args) => {
    const leader = await ctx.db.get(args.leaderId);
    if (!leader) {
      throw new Error("Leader not found");
    }

    // Enrich with department and project data
    const departments = await Promise.all(
      leader.departmentIds.map(id => ctx.db.get(id))
    );
    
    const projects = await Promise.all(
      leader.projectIds.map(id => ctx.db.get(id))
    );

    return {
      ...leader,
      departments: departments.filter(Boolean),
      projects: projects.filter(Boolean),
    };
  },
});

// Get all departments
export const getDepartments = query({
  args: {
    limit: v.optional(v.number()),
    type: v.optional(v.union(v.literal("national"), v.literal("provincial"), v.literal("municipal"))),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    
    let departments;
    if (args.type) {
      departments = await ctx.db
        .query("departments")
        .withIndex("by_type", (q) => q.eq("type", args.type))
        .take(limit);
    } else {
      departments = await ctx.db
        .query("departments")
        .take(limit);
    }

    return departments;
  },
});

// Get department by ID
export const getDepartment = query({
  args: {
    departmentId: v.id("departments"),
  },
  handler: async (ctx, args) => {
    const department = await ctx.db.get(args.departmentId);
    if (!department) {
      throw new Error("Department not found");
    }

    // Enrich with leader and project data
    const leaders = await Promise.all(
      department.leaderIds.map(id => ctx.db.get(id))
    );
    
    const projects = await Promise.all(
      department.projectIds.map(id => ctx.db.get(id))
    );

    return {
      ...department,
      leaders: leaders.filter(Boolean),
      projects: projects.filter(Boolean),
    };
  },
});

// Get all projects
export const getProjects = query({
  args: {
    limit: v.optional(v.number()),
    stage: v.optional(v.union(
      v.literal("planning"),
      v.literal("tender"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("on_hold"),
      v.literal("cancelled")
    )),
    departmentId: v.optional(v.id("departments")),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    
    let projects;
    if (args.stage) {
      projects = await ctx.db
        .query("projects")
        .withIndex("by_stage", (q) => q.eq("stage", args.stage))
        .take(limit);
    } else if (args.departmentId) {
      projects = await ctx.db
        .query("projects")
        .withIndex("by_department", (q) => q.eq("responsibleDepartmentId", args.departmentId))
        .take(limit);
    } else {
      projects = await ctx.db
        .query("projects")
        .withIndex("by_created")
        .order("desc")
        .take(limit);
    }

    return projects;
  },
});

// Get project by ID
export const getProject = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    // Enrich with department and leader data
    const department = await ctx.db.get(project.responsibleDepartmentId);
    const leaders = await Promise.all(
      project.responsibleLeaderIds.map(id => ctx.db.get(id))
    );

    return {
      ...project,
      department: department,
      leaders: leaders.filter(Boolean),
    };
  },
});

// Get parliament items
export const getParliamentItems = query({
  args: {
    limit: v.optional(v.number()),
    type: v.optional(v.union(v.literal("bill"), v.literal("session"), v.literal("vote"), v.literal("debate"))),
    status: v.optional(v.union(v.literal("draft"), v.literal("tabled"), v.literal("debating"), v.literal("voting"), v.literal("passed"), v.literal("rejected"))),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    
    let items;
    if (args.type) {
      items = await ctx.db
        .query("parliament")
        .withIndex("by_type", (q) => q.eq("type", args.type))
        .take(limit);
    } else if (args.status) {
      items = await ctx.db
        .query("parliament")
        .withIndex("by_status", (q) => q.eq("status", args.status))
        .take(limit);
    } else {
      items = await ctx.db
        .query("parliament")
        .withIndex("by_date")
        .order("desc")
        .take(limit);
    }

    return items;
  },
});

