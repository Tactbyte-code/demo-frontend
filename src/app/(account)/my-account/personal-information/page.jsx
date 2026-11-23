
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Camera,
    UserRound,
    Mail,
    BriefcaseBusiness,
    Building2,
    Globe,
    FileText,
    Phone,
    Save,
    X,
    CheckCircle2,
    AlertCircle,
    Loader2,
    ShieldCheck,
} from "lucide-react";

import { useAuthStore } from "@/store/authStore";
import api from "@/lib/axios";

export default function PersonalInformationPage() {
    const user = useAuthStore((state) => state.user);
    const firebaseUser = useAuthStore((state) => state.firebaseUser);
    const setAuthState = useAuthStore((state) => state.setAuthState);

    const fileInputRef = useRef(null);

    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [photoPreview, setPhotoPreview] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);

    const [formData, setFormData] = useState({
        full_name: "",
        display_name: "",
        job_title: "",
        company_name: "",
        website: "",
        bio: "",
        phone_number: "",
    });

    useEffect(() => {
        if (!user) return;

        setFormData({
            full_name: user.full_name || "",
            display_name: user.display_name || "",
            job_title: user.job_title || "",
            company_name: user.company_name || "",
            website: user.website || "",
            bio: user.bio || "",
            phone_number: user.phone_number || "",
        });

        setPhotoPreview(user.photo_url || null);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setSuccess("");
        setError("");
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            setError("Please upload a JPG, PNG, or WEBP image.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("Profile image must be smaller than 5 MB.");
            return;
        }

        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
        setSuccess("");
        setError("");
    };

    const handleCancel = () => {
        if (!user) return;

        setFormData({
            full_name: user.full_name || "",
            display_name: user.display_name || "",
            job_title: user.job_title || "",
            company_name: user.company_name || "",
            website: user.website || "",
            bio: user.bio || "",
            phone_number: user.phone_number || "",
        });

        setPhotoPreview(user.photo_url || null);
        setPhotoFile(null);
        setSuccess("");
        setError("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);
        setSuccess("");
        setError("");

        try {
            // Update text-based profile information.
            const response = await api.patch("/users/profile", formData);

            const updatedUser = response.data?.user || response.data;

            if (!updatedUser?.id) {
                throw new Error("Invalid profile response from server.");
            }

            setAuthState({
                user: updatedUser,
                firebaseUser,
            });

            // Photo upload is intentionally separate.
            // Connect this to your backend's image-upload endpoint
            // when that endpoint is implemented.

            setPhotoFile(null);
            setSuccess("Your profile has been updated successfully.");

        } catch (err) {
            console.error("Profile update failed:", err);

            setError(
                err.response?.data?.detail ||
                err.message ||
                "Unable to update your profile. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };

    const initials = (formData.full_name || "PP")
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <main className="relative min-h-screen overflow-x-clip bg-[#FAFAFC] px-4 py-8 text-slate-900 sm:px-8 lg:px-12 lg:py-12">
            {/* Background glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[420px] w-[1080px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-violet-200/35 via-fuchsia-100/25 to-indigo-100/30 blur-3xl"
            />

            <div className="mx-auto w-full max-w-7xl">
                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8"
                >
                    <Link
                        href="/my-account"
                        className="group inline-flex items-center gap-2 rounded-full px-0 py-2 text-xs font-medium text-slate-600 transition-all hover:text-violet-700"
                    >
                        <ArrowLeft
                            size={14}
                            className="transition-transform group-hover:-translate-x-0.5"
                        />
                        Back to My Account
                    </Link>
                </motion.div>

                {/* Page heading */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="mb-8"
                >
                    <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-violet-100 text-violet-700">
                            <UserRound size={18} />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-violet-700">
                            My Account
                        </span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Personal Information
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                        Manage your personal details and the information displayed
                        across your ProblemPulse account.
                    </p>
                </motion.div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
                        {/* Left profile card */}
                        <motion.aside
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-5 lg:sticky lg:top-8 lg:col-span-4"
                        >
                            <div className="overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
                                <div className="h-24 bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600" />

                                <div className="px-6 pb-6">
                                    <div className="-mt-12 mb-4 flex items-end justify-between">
                                        <div className="relative">
                                            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-violet-600 to-indigo-700 text-2xl font-bold text-white shadow-md">
                                                {photoPreview ? (
                                                    <Image
                                                        src={photoPreview}
                                                        alt={formData.full_name || "Profile"}
                                                        width={96}
                                                        height={96}
                                                        unoptimized={photoPreview.startsWith("blob:")}
                                                        className="h-full w-full rounded-full object-cover"
                                                    />
                                                ) : (
                                                    initials
                                                )}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-violet-600 text-white shadow-sm transition-colors hover:bg-violet-700"
                                                title="Change profile photo"
                                            >
                                                <Camera size={14} />
                                            </button>

                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/png,image/jpeg,image/webp"
                                                onChange={handlePhotoChange}
                                                className="hidden"
                                            />
                                        </div>

                                        <span className="mb-1 inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                                            <CheckCircle2 size={12} />
                                            Active
                                        </span>
                                    </div>

                                    <h2 className="text-lg font-bold text-slate-900">
                                        {formData.full_name || "Your Name"}
                                    </h2>

                                    <p className="mt-1 break-all text-xs text-slate-500">
                                        {user?.email || ""}
                                    </p>

                                    <div className="mt-5 border-t border-slate-100 pt-4">
                                        <p className="text-xs font-semibold text-slate-800">
                                            Profile photo
                                        </p>

                                        <p className="mt-1 text-[11px] leading-5 text-slate-500">
                                            Use a clear image so people can recognize
                                            your profile.
                                        </p>

                                        <div className="mt-3 flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="rounded-md border border-violet-200 bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-700 transition-colors hover:bg-violet-100"
                                            >
                                                Upload photo
                                            </button>

                                            {photoPreview && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setPhotoPreview(null);
                                                        setPhotoFile(null);
                                                        setSuccess("");
                                                    }}
                                                    className="rounded-md border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>

                                        <p className="mt-2 text-[10px] text-slate-400">
                                            JPG, PNG or WEBP · Maximum 5 MB
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Account information */}
                            <div className="rounded-lg border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={17} className="text-emerald-600" />
                                    <h3 className="text-xs font-bold text-slate-900">
                                        Account Information
                                    </h3>
                                </div>

                                <div className="mt-4 space-y-3">
                                    <div>
                                        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                                            Account ID
                                        </p>
                                        <p className="mt-1 text-xs font-semibold text-slate-700">
                                            {user?.id ?? "—"}
                                        </p>
                                    </div>

                                    <div className="border-t border-slate-100 pt-3">
                                        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                                            Member since
                                        </p>
                                        <p className="mt-1 text-xs font-semibold text-slate-700">
                                            {user?.created_at
                                                ? new Date(user.created_at).toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        month: "long",
                                                        year: "numeric",
                                                    }
                                                )
                                                : "—"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.aside>

                        {/* Right form */}
                        <motion.section
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.08 }}
                            className="lg:col-span-8"
                        >
                            <div className="space-y-6">
                                {/* Basic information */}
                                <div className="rounded-lg border border-slate-200/80 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] sm:p-7">
                                    <div className="mb-6">
                                        <h2 className="text-sm font-bold text-slate-900">
                                            Basic Information
                                        </h2>
                                        <p className="mt-1 text-xs text-slate-500">
                                            Your name and basic profile details.
                                        </p>
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <FormField
                                            label="Full name"
                                            name="full_name"
                                            value={formData.full_name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            icon={UserRound}
                                            required
                                        />

                                        <FormField
                                            label="Display name"
                                            name="display_name"
                                            value={formData.display_name}
                                            onChange={handleChange}
                                            placeholder="How should we address you?"
                                            icon={UserRound}
                                        />

                                        <div className="sm:col-span-2">
                                            <FormField
                                                label="Email address"
                                                value={user?.email || ""}
                                                icon={Mail}
                                                disabled
                                                helper="Email changes and verification are managed under Login & Security."
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Professional information */}
                                <div className="rounded-md border border-slate-200/80 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] sm:p-7">
                                    <div className="mb-6">
                                        <h2 className="text-sm font-bold text-slate-900">
                                            Professional Information
                                        </h2>
                                        <p className="mt-1 text-xs text-slate-500">
                                            Tell us about your work and organization.
                                        </p>
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <FormField
                                            label="Job title"
                                            name="job_title"
                                            value={formData.job_title}
                                            onChange={handleChange}
                                            placeholder="e.g. Product Manager"
                                            icon={BriefcaseBusiness}
                                        />

                                        <FormField
                                            label="Company / Organization"
                                            name="company_name"
                                            value={formData.company_name}
                                            onChange={handleChange}
                                            placeholder="Your company name"
                                            icon={Building2}
                                        />

                                        <div className="sm:col-span-2">
                                            <FormField
                                                label="Website"
                                                name="website"
                                                value={formData.website}
                                                onChange={handleChange}
                                                placeholder="https://yourwebsite.com"
                                                icon={Globe}
                                                type="url"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* About */}
                                <div className="rounded-md border border-slate-200/80 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] sm:p-7">
                                    <div className="mb-6">
                                        <h2 className="text-sm font-bold text-slate-900">
                                            About You
                                        </h2>
                                        <p className="mt-1 text-xs text-slate-500">
                                            Add a short introduction to your profile.
                                        </p>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="bio"
                                            className="mb-2 block text-xs font-semibold text-slate-700"
                                        >
                                            Bio
                                        </label>

                                        <div className="relative">
                                            <FileText
                                                size={15}
                                                className="absolute left-3.5 top-3.5 text-slate-400"
                                            />

                                            <textarea
                                                id="bio"
                                                name="bio"
                                                rows={4}
                                                maxLength={300}
                                                value={formData.bio}
                                                onChange={handleChange}
                                                placeholder="Tell us a little about yourself..."
                                                className="w-full resize-none rounded-md border border-slate-200 bg-white py-3 pl-10 pr-4 text-xs leading-6 text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-violet-400 focus:ring-3 focus:ring-violet-500/10"
                                            />
                                        </div>

                                        <p className="mt-1.5 text-right text-[10px] text-slate-400">
                                            {formData.bio.length}/300 characters
                                        </p>
                                    </div>
                                </div>

                                {/* Contact */}
                                <div className="rounded-md border border-slate-200/80 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] sm:p-7">
                                    <div className="mb-6">
                                        <h2 className="text-sm font-bold text-slate-900">
                                            Contact Information
                                        </h2>
                                        <p className="mt-1 text-xs text-slate-500">
                                            Optional contact details for your account.
                                        </p>
                                    </div>

                                    <FormField
                                        label="Phone number"
                                        name="phone_number"
                                        value={formData.phone_number}
                                        onChange={handleChange}
                                        placeholder="Enter your phone number"
                                        icon={Phone}
                                        type="tel"
                                    />

                                    <p className="mt-2 text-[10px] text-slate-400">
                                        Phone verification can be managed separately
                                        under Login & Security.
                                    </p>
                                </div>

                                {/* Feedback */}
                                {success && (
                                    <div className="flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-700">
                                        <CheckCircle2 size={16} />
                                        {success}
                                    </div>
                                )}

                                {error && (
                                    <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
                                        <AlertCircle size={16} />
                                        {error}
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex flex-col-reverse justify-end gap-3 rounded-md border border-slate-200/80 bg-white p-4 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        disabled={saving}
                                        className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-5 py-2.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50"
                                    >
                                        <X size={14} />
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={saving || !user}
                                        className="inline-flex items-center justify-center gap-2 rounded-md bg-violet-600 px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {saving ? (
                                            <>
                                                <Loader2 size={15} className="animate-spin" />
                                                Saving changes...
                                            </>
                                        ) : (
                                            <>
                                                <Save size={15} />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.section>
                    </div>
                </form>

                <footer className="mt-14 border-t border-slate-200/60 pt-6 text-center">
                    <p className="text-xs font-medium tracking-wide text-slate-400">
                        A better way to discover what matters —{" "}
                        <span className="font-semibold text-slate-500">
                            ProblemPulse
                        </span>
                    </p>
                </footer>
            </div>
        </main>
    );
}

function FormField({
    label,
    name,
    value,
    onChange,
    placeholder,
    icon: Icon,
    type = "text",
    disabled = false,
    required = false,
    helper,
}) {
    const id = name || label.toLowerCase().replaceAll(" ", "-");

    return (
        <div>
            <label
                htmlFor={id}
                className="mb-2 block text-xs font-semibold text-slate-700"
            >
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </label>

            <div className="relative">
                {Icon && (
                    <Icon
                        size={15}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                )}

                <input
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    className={`w-full rounded-md border border-slate-200 py-3 pr-4 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-violet-400 focus:ring-3 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 ${Icon ? "pl-10" : "pl-4"
                        }`}
                />
            </div>

            {helper && (
                <p className="mt-1.5 text-[10px] leading-4 text-slate-400">
                    {helper}
                </p>
            )}
        </div>
    );
}
