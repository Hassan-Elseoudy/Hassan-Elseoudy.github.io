#!/usr/bin/env python3
"""
Comprehensive Contribution Fetcher
Fetches contributions from:
1. Zalando Jira (using PAT)
2. Cynopsis GitHub organization
3. Noaat-related repositories
4. Personal GitHub repositories

Author: Hassan Elseoudy
"""

import requests
import json
import subprocess
import csv
import os
from datetime import datetime, timedelta
import argparse
from collections import defaultdict

class ContributionFetcher:
    def __init__(self, jira_token, jira_username="helseoudy"):
        self.jira_token = jira_token
        self.jira_username = jira_username
        self.jira_base_url = "https://jira.zalando.net/rest/api/2"
        self.headers = {
            "Authorization": f"Bearer {jira_token}",
            "Content-Type": "application/json"
        }
        
    def fetch_jira_contributions(self, start_date=None, end_date=None):
        """Fetch all Jira contributions where user is assignee or reporter"""
        print("🔍 Fetching Zalando Jira contributions...")
        
        # Build JQL query
        jql_parts = [
            f"(assignee={self.jira_username} OR reporter={self.jira_username})"
        ]
        
        if start_date:
            jql_parts.append(f"created >= '{start_date}'")
        if end_date:
            jql_parts.append(f"created <= '{end_date}'")
            
        jql = " AND ".join(jql_parts)
        
        all_issues = []
        start_at = 0
        max_results = 100
        
        while True:
            params = {
                "jql": jql,
                "startAt": start_at,
                "maxResults": max_results,
                "fields": "key,summary,description,issuetype,project,status,created,updated,priority,assignee,reporter,resolution"
            }
            
            try:
                response = requests.get(
                    f"{self.jira_base_url}/search",
                    headers=self.headers,
                    params=params
                )
                response.raise_for_status()
                data = response.json()
                
                issues = data.get("issues", [])
                all_issues.extend(issues)
                
                print(f"  📥 Fetched {len(issues)} issues (total: {len(all_issues)})")
                
                if len(issues) < max_results:
                    break
                    
                start_at += max_results
                
            except requests.exceptions.RequestException as e:
                print(f"❌ Error fetching Jira data: {e}")
                break
        
        print(f"✅ Total Jira issues fetched: {len(all_issues)}")
        return all_issues
    
    def fetch_github_cynopsis_contributions(self):
        """Fetch merged PRs from Cynopsis organization"""
        print("🔍 Fetching Cynopsis GitHub merged PRs...")
        
        contributions = []
        
        try:
            # Get list of Cynopsis repositories
            result = subprocess.run(
                ["gh", "repo", "list", "Cynopsis", "--limit", "50", "--json", "name,description,primaryLanguage,updatedAt"],
                capture_output=True, text=True, check=True
            )
            repos = json.loads(result.stdout)
            
            for repo in repos:
                repo_name = repo["name"]
                print(f"  📂 Processing {repo_name}...")
                
                try:
                    # Get merged PRs by user (try both usernames)
                    usernames = ["Hassan-Elseoudy", "semsem-dev"]
                    all_prs = []
                    
                    for username in usernames:
                        pr_result = subprocess.run(
                            ["gh", "pr", "list", "--repo", f"Cynopsis/{repo_name}", "--author", username, 
                             "--state", "merged", "--limit", "100", "--json", "title,number,mergedAt,url,additions,deletions"],
                            capture_output=True, text=True, check=True
                        )
                        
                        if pr_result.stdout.strip():
                            prs = json.loads(pr_result.stdout)
                            if prs:
                                print(f"    👤 Found {len(prs)} PRs under username: {username}")
                                all_prs.extend(prs)
                    
                    # Combine results
                    prs = all_prs
                    
                    if prs:
                        total_additions = sum(pr.get("additions", 0) for pr in prs)
                        total_deletions = sum(pr.get("deletions", 0) for pr in prs)
                        print(f"    ✅ {len(prs)} merged PRs in {repo_name} (+{total_additions}/-{total_deletions})")
                        
                        contributions.append({
                            "repository": f"Cynopsis/{repo_name}",
                            "merged_prs": len(prs),
                            "additions": total_additions,
                            "deletions": total_deletions,
                            "description": repo.get("description", ""),
                            "language": repo.get("primaryLanguage", {}).get("name", "") if repo.get("primaryLanguage") else "",
                            "updated": repo.get("updatedAt", ""),
                            "prs": prs,
                            "type": "github_cynopsis_prs"
                        })
                        
                except subprocess.CalledProcessError as e:
                    print(f"    ⚠️  Could not fetch PRs for {repo_name}")
                    continue
                    
        except subprocess.CalledProcessError as e:
            print(f"❌ Error fetching Cynopsis repositories: {e}")
        
        total_prs = sum(contrib["merged_prs"] for contrib in contributions)
        print(f"✅ Total Cynopsis merged PRs: {total_prs} across {len(contributions)} repositories")
        return contributions
    
    def fetch_noaat_contributions(self):
        """Fetch Noaat-related merged PRs from Noaat-com organization"""
        print("🔍 Fetching Noaat-com organization merged PRs...")
        
        contributions = []
        
        try:
            # Get list of Noaat-com repositories
            result = subprocess.run(
                ["gh", "repo", "list", "Noaat-com", "--limit", "50", "--json", "name,description,primaryLanguage,updatedAt"],
                capture_output=True, text=True, check=True
            )
            repos = json.loads(result.stdout)
            
            for repo in repos:
                repo_name = repo["name"]
                print(f"  📂 Processing {repo_name}...")
                
                try:
                    # Get merged PRs by user (try both usernames)
                    usernames = ["Hassan-Elseoudy", "semsem-dev"]
                    all_prs = []
                    
                    for username in usernames:
                        pr_result = subprocess.run(
                            ["gh", "pr", "list", "--repo", f"Noaat-com/{repo_name}", "--author", username, 
                             "--state", "merged", "--limit", "100", "--json", "title,number,mergedAt,url,additions,deletions"],
                            capture_output=True, text=True, check=True
                        )
                        
                        if pr_result.stdout.strip():
                            prs = json.loads(pr_result.stdout)
                            if prs:
                                print(f"    👤 Found {len(prs)} PRs under username: {username}")
                                all_prs.extend(prs)
                    
                    # Combine results
                    prs = all_prs
                    
                    if prs:
                        total_additions = sum(pr.get("additions", 0) for pr in prs)
                        total_deletions = sum(pr.get("deletions", 0) for pr in prs)
                        print(f"    ✅ {len(prs)} merged PRs in {repo_name} (+{total_additions}/-{total_deletions})")
                        
                        contributions.append({
                            "repository": f"Noaat-com/{repo_name}",
                            "merged_prs": len(prs),
                            "additions": total_additions,
                            "deletions": total_deletions,
                            "description": repo.get("description", ""),
                            "language": repo.get("primaryLanguage", {}).get("name", "") if repo.get("primaryLanguage") else "",
                            "updated": repo.get("updatedAt", ""),
                            "prs": prs,
                            "type": "github_noaat_prs"
                        })
                    else:
                        print(f"    📭 No merged PRs found in {repo_name}")
                        
                except subprocess.CalledProcessError as e:
                    print(f"    ⚠️  Could not fetch PRs for {repo_name}")
                    continue
                            
        except subprocess.CalledProcessError as e:
            print(f"❌ Error fetching Noaat repositories: {e}")
        
        total_prs = sum(contrib["merged_prs"] for contrib in contributions)
        print(f"✅ Total Noaat merged PRs: {total_prs} across {len(contributions)} repositories")
        return contributions
    
    def fetch_personal_github_contributions(self):
        """Fetch contributions from all personal GitHub repositories"""
        print("🔍 Fetching personal GitHub contributions...")
        
        contributions = []
        
        try:
            # Get all personal repositories
            result = subprocess.run(
                ["gh", "repo", "list", "Hassan-Elseoudy", "--limit", "200", "--json", "name,description,primaryLanguage,updatedAt,stargazerCount"],
                capture_output=True, text=True, check=True
            )
            repos = json.loads(result.stdout)
            
            print(f"  📂 Found {len(repos)} personal repositories")
            
            for repo in repos:
                repo_name = repo["name"]
                print(f"  📂 Processing {repo_name}...")
                
                try:
                    # Get commit count for this repo
                    commit_result = subprocess.run(
                        ["gh", "api", f"repos/Hassan-Elseoudy/{repo_name}/commits", "--jq", "length"],
                        capture_output=True, text=True, check=True
                    )
                    commit_count = int(commit_result.stdout.strip()) if commit_result.stdout.strip() else 0
                    
                    if commit_count > 0:
                        print(f"    ✅ {commit_count} commits in {repo_name}")
                        contributions.append({
                            "repository": f"Hassan-Elseoudy/{repo_name}",
                            "contributions": commit_count,
                            "description": repo.get("description", ""),
                            "language": repo.get("primaryLanguage", {}).get("name", "") if repo.get("primaryLanguage") else "",
                            "updated": repo.get("updatedAt", ""),
                            "stars": repo.get("stargazerCount", 0),
                            "type": "github_personal"
                        })
                    else:
                        print(f"    📭 No commits in {repo_name}")
                        
                except subprocess.CalledProcessError as e:
                    print(f"    ⚠️  Could not fetch commits for {repo_name}")
                    continue
                    
        except subprocess.CalledProcessError as e:
            print(f"❌ Error fetching personal repositories: {e}")
        
        print(f"✅ Total personal GitHub repositories with commits: {len(contributions)}")
        return contributions
    
    def fetch_recent_github_activity(self, days=90):
        """Fetch recent GitHub activity across all repositories"""
        print(f"🔍 Fetching recent GitHub activity (last {days} days)...")
        
        since_date = (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")
        activity = []
        
        try:
            # Get recent events - simplified approach
            result = subprocess.run([
                "gh", "api", "user/events", "--limit", "100"
            ], capture_output=True, text=True, check=True)
            
            if result.stdout.strip():
                events = json.loads(result.stdout)
                for event in events:
                    if (event.get("type") == "PushEvent" and 
                        event.get("created_at", "").startswith("2025") or event.get("created_at", "").startswith("2026")):
                        
                        commits = len(event.get("payload", {}).get("commits", []))
                        if commits > 0:
                            activity.append({
                                "repository": event["repo"]["name"],
                                "date": event["created_at"],
                                "commits": commits,
                                "type": "github_recent_activity"
                            })
                        
        except subprocess.CalledProcessError as e:
            print(f"❌ Error fetching recent GitHub activity: {e}")
        except json.JSONDecodeError as e:
            print(f"❌ Error parsing GitHub activity JSON: {e}")
        
        print(f"✅ Recent GitHub activities: {len(activity)}")
        return activity
    
    def analyze_contributions_by_time(self, jira_issues, github_contributions):
        """Analyze contributions by time period"""
        print("📊 Analyzing contributions by time...")
        
        monthly_stats = defaultdict(lambda: {
            "jira_created": 0,
            "jira_resolved": 0,
            "github_commits": 0,
            "projects": set()
        })
        
        # Process Jira issues
        for issue in jira_issues:
            try:
                created_str = issue["fields"]["created"]
                # Handle different date formats
                if "T" in created_str:
                    if created_str.endswith("Z"):
                        created_date = datetime.fromisoformat(created_str.replace("Z", "+00:00"))
                    elif created_str.endswith("+0100") or created_str.endswith("+0200"):
                        # Handle timezone offset format
                        created_date = datetime.fromisoformat(created_str[:-5] + created_str[-5:-2] + ":" + created_str[-2:])
                    else:
                        created_date = datetime.fromisoformat(created_str)
                else:
                    created_date = datetime.fromisoformat(created_str)
                
                month_key = created_date.strftime("%Y-%m")
                
                monthly_stats[month_key]["jira_created"] += 1
                monthly_stats[month_key]["projects"].add(issue["fields"]["project"]["key"])
                
                # Check if resolved
                if issue["fields"]["status"]["statusCategory"]["key"] == "done":
                    monthly_stats[month_key]["jira_resolved"] += 1
            except Exception as e:
                print(f"    ⚠️ Could not parse date for {issue.get('key', 'unknown')}: {e}")
                continue
        
        # Process GitHub contributions
        for contrib in github_contributions:
            if contrib.get("updated"):
                try:
                    updated_date = datetime.fromisoformat(contrib["updated"].replace("Z", "+00:00"))
                    month_key = updated_date.strftime("%Y-%m")
                    monthly_stats[month_key]["github_commits"] += contrib.get("contributions", 0)
                except:
                    pass
        
        return monthly_stats
    
    def save_to_csv(self, jira_issues, github_contributions, filename="contributions_report.csv"):
        """Save all contributions to CSV file"""
        print(f"💾 Saving report to {filename}...")
        
        with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            
            # Write Jira contributions
            writer.writerow(["=== ZALANDO JIRA CONTRIBUTIONS ==="])
            writer.writerow(["Key", "Summary", "Description", "Type", "Project", "Status", "Created", "Priority", "Role"])
            
            for issue in jira_issues:
                fields = issue["fields"]
                assignee = fields.get("assignee")
                role = "Assignee" if assignee and assignee.get("name") == self.jira_username else "Reporter"
                
                description = fields.get("description", "") or ""
                description_preview = description[:200] + "..." if len(description) > 200 else description
                # Clean up description - remove newlines and extra whitespace
                description_preview = " ".join(description_preview.split())
                
                writer.writerow([
                    issue["key"],
                    fields["summary"][:100] + "..." if len(fields["summary"]) > 100 else fields["summary"],
                    description_preview,
                    fields["issuetype"]["name"],
                    fields["project"]["key"],
                    fields["status"]["name"],
                    fields["created"][:10],
                    fields["priority"]["name"],
                    role
                ])
            
            writer.writerow([])
            
            # Write GitHub contributions
            writer.writerow(["=== GITHUB MERGED PRS ==="])
            writer.writerow(["Repository", "Merged PRs", "Additions", "Deletions", "Language", "Description", "Type", "Last Updated"])
            
            for contrib in github_contributions:
                if "merged_prs" in contrib:
                    writer.writerow([
                        contrib["repository"],
                        contrib["merged_prs"],
                        contrib.get("additions", 0),
                        contrib.get("deletions", 0),
                        contrib.get("language", ""),
                        contrib.get("description", "")[:100] + "..." if len(contrib.get("description", "")) > 100 else contrib.get("description", ""),
                        contrib["type"],
                        contrib.get("updated", "")[:10]
                    ])
                else:
                    # Fallback for old format
                    writer.writerow([
                        contrib["repository"],
                        contrib.get("contributions", 0),
                        0,
                        0,
                        contrib.get("language", ""),
                        contrib.get("description", "")[:100] + "..." if len(contrib.get("description", "")) > 100 else contrib.get("description", ""),
                        contrib["type"],
                        contrib.get("updated", "")[:10]
                    ])
            
            # Write individual PR details
            writer.writerow([])
            writer.writerow(["=== INDIVIDUAL PR DETAILS ==="])
            writer.writerow(["Repository", "PR Title", "PR Number", "Merged Date", "URL", "Additions", "Deletions"])
            
            for contrib in github_contributions:
                if "prs" in contrib:
                    for pr in contrib["prs"]:
                        writer.writerow([
                            contrib["repository"],
                            pr.get("title", "")[:100] + "..." if len(pr.get("title", "")) > 100 else pr.get("title", ""),
                            pr.get("number", ""),
                            pr.get("mergedAt", "")[:10] if pr.get("mergedAt") else "",
                            pr.get("url", ""),
                            pr.get("additions", 0),
                            pr.get("deletions", 0)
                        ])
        
        print(f"✅ Report saved to {filename}")
    
    def generate_summary_report(self, jira_issues, github_contributions, monthly_stats):
        """Generate a summary report"""
        print("\n" + "="*60)
        print("📈 CONTRIBUTION SUMMARY REPORT")
        print("="*60)
        
        # Jira Summary
        jira_by_project = defaultdict(int)
        jira_by_type = defaultdict(int)
        jira_by_status = defaultdict(int)
        
        for issue in jira_issues:
            fields = issue["fields"]
            jira_by_project[fields["project"]["key"]] += 1
            jira_by_type[fields["issuetype"]["name"]] += 1
            jira_by_status[fields["status"]["statusCategory"]["name"]] += 1
        
        print(f"\n🎯 ZALANDO JIRA CONTRIBUTIONS:")
        print(f"   Total Issues: {len(jira_issues)}")
        print(f"   Top Projects: {dict(list(sorted(jira_by_project.items(), key=lambda x: x[1], reverse=True))[:5])}")
        print(f"   Issue Types: {dict(jira_by_type)}")
        print(f"   Status: {dict(jira_by_status)}")
        
        # GitHub Summary
        total_prs = sum(contrib.get("merged_prs", contrib.get("contributions", 0)) for contrib in github_contributions)
        total_additions = sum(contrib.get("additions", 0) for contrib in github_contributions)
        total_deletions = sum(contrib.get("deletions", 0) for contrib in github_contributions)
        github_by_org = defaultdict(int)
        languages = defaultdict(int)
        
        for contrib in github_contributions:
            org = contrib["repository"].split("/")[0]
            github_by_org[org] += contrib.get("merged_prs", contrib.get("contributions", 0))
            if contrib.get("language"):
                languages[contrib["language"]] += 1
        
        print(f"\n💻 GITHUB MERGED PRS:")
        print(f"   Total Merged PRs: {total_prs}")
        print(f"   Lines Added: +{total_additions}")
        print(f"   Lines Deleted: -{total_deletions}")
        print(f"   Organizations: {dict(github_by_org)}")
        print(f"   Languages: {dict(languages)}")
        
        # Time Analysis
        print(f"\n📅 MONTHLY ACTIVITY (Last 12 months):")
        recent_months = sorted(monthly_stats.keys())[-12:]
        for month in recent_months:
            stats = monthly_stats[month]
            projects_count = len(stats["projects"])
            print(f"   {month}: {stats['jira_created']} Jira issues, {stats['github_commits']} GitHub commits, {projects_count} projects")
        
        print("\n" + "="*60)

def main():
    parser = argparse.ArgumentParser(description="Fetch contributions from Jira and GitHub")
    parser.add_argument("--jira-token", required=True, help="Jira Personal Access Token")
    parser.add_argument("--start-date", help="Start date for Jira search (YYYY-MM-DD)")
    parser.add_argument("--end-date", help="End date for Jira search (YYYY-MM-DD)")
    parser.add_argument("--output", default="contributions_report.csv", help="Output CSV filename")
    parser.add_argument("--recent-days", type=int, default=90, help="Days for recent GitHub activity")
    
    args = parser.parse_args()
    
    print("🚀 Starting contribution fetch...")
    print(f"📅 Date range: {args.start_date or 'All time'} to {args.end_date or 'Present'}")
    
    fetcher = ContributionFetcher(args.jira_token)
    
    # Fetch all contributions
    jira_issues = fetcher.fetch_jira_contributions(args.start_date, args.end_date)
    cynopsis_contributions = fetcher.fetch_github_cynopsis_contributions()
    noaat_contributions = fetcher.fetch_noaat_contributions()
    recent_activity = fetcher.fetch_recent_github_activity(args.recent_days)
    
    # Combine GitHub contributions
    all_github_contributions = cynopsis_contributions + noaat_contributions
    
    # Analyze by time
    monthly_stats = fetcher.analyze_contributions_by_time(jira_issues, all_github_contributions)
    
    # Save to CSV
    fetcher.save_to_csv(jira_issues, all_github_contributions + recent_activity, args.output)
    
    # Generate summary
    fetcher.generate_summary_report(jira_issues, all_github_contributions, monthly_stats)
    
    print(f"\n✅ Contribution fetch completed! Check {args.output} for detailed data.")

if __name__ == "__main__":
    main()